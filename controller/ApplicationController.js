import { applicationModel } from "../models/ApplicationModel.js";
import { jobModel } from "../models/JobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    // check if the user has already applied for this job
    const existingApplication = await applicationModel.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have Already Applied for this job",
        success: false,
      });
    }

    // if the job exists
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job Not Found!",
        success: false,
      });
    }
    // create a new applicant
    const newApplication = await applicationModel.create({
      job: jobId,
      applicant: userId,
    });
   job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job Applied Successfuly",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await applicationModel
      .find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", optoins: { sort: { createdAt: -1 } } },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found!",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status Is Required!",
        success: false,
      });
    }
    // find the application by applicantion Id
    const application = await applicationModel.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application Not Found!",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });

  } catch (error) {
    console.log(error.message);
  }
};
