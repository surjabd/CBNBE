import * as Yup from "yup";
import Course from "../models/Course";
import { BadRequestError, ValidationError } from "../utils/ApiError";

let courseController = {
  get: async (req, res, next) => {
    try {
      const course = await Course.findAll();

      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const course = await Course.create(req.body);
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  
  find: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);

      if (!course) throw new BadRequestError();

      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (!course) throw new BadRequestError();

      course.destroy();

      return res.status(200).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default courseController;
