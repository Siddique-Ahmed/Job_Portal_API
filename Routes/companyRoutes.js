import express from "express";
import {
  getCompany,
  getCompanyByID,
  updateCompany,
  registerCompany,
} from "../controller/companyController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyByID);
router.route("/update/:id").put(isAuthenticated, singleUpload , updateCompany);

export default router;
