export const urlRegex = /^(https?:\/\/[^\s]+|\S+\.\S+)$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const linkedInUrlRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]*\/?$/;

export const validateUser = async (userName) => {
  try {
    const user = await mongoose.model("User").findById(userName);
    return user !== null;
  } catch (error) {
    throw new Error("Error validating userId: " + error.message);
  }
};

export const validateLink = (url) => {
  if (!url) return true; // Allow empty string
  return urlRegex.test(url);
};

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validateLinkedInUrl = (url) => {
  if (!url) return true; // Allow empty string
  return linkedInUrlRegex.test(url);
};

export const validateInstitution = async (institutionName) => {
  try {
    const institution = await mongoose
      .model("Institution")
      .findById(institutionName);
    return institution !== null;
  } catch (error) {
    throw new Error("Error validating institutionId: " + error.message);
  }
};

export const validateCompany = async (companyName) => {
  try {
    const company = await mongoose.model("Company").findById(companyName);
    return company !== null;
  } catch (error) {
    throw new Error("Error validating companyId: " + error.message);
  }
};
