/* USED FOR ONE-TIME DATA LOAD */
import User from "../models/User.js";
import Institution from "../models/Institution.js";
import Company from "../models/Company.js";
import Occupation from "../models/Occupation.js";
import Education from "../models/Education.js";
import JobOffer from "../models/JobOffer.js";
import WhatsappGroup from "../models/WhatsappGroup.js";
import { users, companies, institutions, occupations, educations, jobs, whatsappGroups } from "./data/index.js";

const loadData = () => {
    User.insertMany(users);
    Institution.insertMany(institutions);
    Company.insertMany(companies);
    Occupation.insertMany(occupations);
    Education.insertMany(educations);
    JobOffer.insertMany(jobs);
    WhatsappGroup.insertMany(whatsappGroups);
};

export default loadData;