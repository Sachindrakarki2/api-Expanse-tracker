import express from "express";
import {
  createTrans,
  getTransByUserId,
} from "../models/transModel/TransModel.js";
const router = express.Router();

import { createUser, getSingleUser } from "../models/userModel/UserModel.js";

// creating new user
router.post("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const result = await createTrans({ ...req.body, userId: authorization });
    result?._id
      ? res.json({
          status: "success",
          message: "New Transactions has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the transaction, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

//getting user specifi transactions  based on user id
router.get("/", async (req, res, next) => {
  try {
    //auth headers
    const result = await getTransByUserId();

    res.json({
      status: "success",
      message: "New Transactions has been added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//updating user profile

//deleting user profile
router.delete("/", async (req, res, next) => {
  try {
    //auth headers

    const { authorization } = req.headers;

    const result = await deleteTransByIds(req.body, authorization);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: result?.deleteCount + "item(s) deleted",
        })
      : res.json({
          status: "error",
          message: "unable to delete. Please try again later.",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
