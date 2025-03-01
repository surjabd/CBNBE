import * as Yup from "yup";
import section from "../models/Section";
import { BadRequestError, ValidationError } from "../utils/ApiError";
import Section from "../models/Section";

let sectionController = {
  get: async (req, res, next) => {
    try {
      const section = await Course.findAll();

      return res.status(200).json(section);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const section = await Course.create(req.body);
      return res.status(200).json(section);
    } catch (error) {
      next(error);
    }
  },
  
  find: async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await Course.findByPk(id);

      if (!section) throw new BadRequestError();

      return res.status(200).json(section);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await Section.findByPk(id);
      if (!section) throw new BadRequestError();

      section.destroy();

      return res.status(200).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  },
}

export default sectionController;
