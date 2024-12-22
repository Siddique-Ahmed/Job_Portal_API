import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs
} from "../controller/jobController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

export default router;