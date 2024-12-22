import { companyModel } from "../models/CompanyModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// register company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is Required!",
        success: false,
      });
    }
    let company = await companyModel.findOne({ name: companyName });
    if (company) {
      return res.status(200).json({
        message: "You Can't add same Company",
        success: false,
      });
    }
    company = await companyModel.create({
      name: companyName,
      userID: req.id,
    });

    return res.status(201).json({
      message: "Company Registered Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// get all company data
export const getCompany = async (req, res) => {
  try {
    const userID = req.id;
    const companies = await companyModel.find({ userID });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Get Companies successfully",
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// get single company data
export const getCompanyByID = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await companyModel.findById(companyID);
    if (!company) {
      return res.status(404).json({
        message: "Companies not Found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// update company data
export const updateCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    console.log({ name, description, location, website });

    // cloudinary aayega yaha
    const file = req?.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const logo = cloudResponse.secure_url;

    const updateData = { name, description, location, website,logo };

    const company = await companyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company Not Found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
