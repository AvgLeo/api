import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// This function registers a new user and saves it to the DB
export const register = async (req, res) => {
  try {
    // extract user details from the JSON in req.body sent from frontend
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    // encrypt password in order to store in database
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // instance a new User with the info got and save it to DB using mongoose schema
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phoneNumber,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This function verifies the user's password and generates a JWT token for the user
export const login = async (req, res) => {
  try {
    // extract email and password from the JSON in req.body sent from frontend
    const { email, password } = req.body;

    // check if user exists in DB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // use bcrypt to compare the encrypted password in DB to the password got from frontend
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    }

    // generate a JWT token, with 1 day expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // delete password from user JSON to be sent to frontend
    user.password = undefined;
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This function "logs out" the user by clearing the cookie
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
