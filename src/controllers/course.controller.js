import * as Yup from "yup";
import Course from "../models/Course";
import { BadRequestError, ValidationError } from "../utils/ApiError";
import User from "../models/User";
import Coupon from "../models/Coupon";
import { v4 as uuidv4 } from 'uuid';
import PurchaseHistory from "../models/PurchaseHistory";

let courseController = {
  get: async (req, res, next) => {
    try {
      const course = await Course.findAll({ include: User });
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      console.log(req.body);
      const course = await Course.create(req.body);
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  
  find: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id,{ include: { all: true, nested: true } });

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
  },
  registerToCourse: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        userId: Yup.string().required(),
        courseId: Yup.string().required(),
        couponCode: Yup.string().required(),
        bkashTransactionId: Yup.string().nullable(),
      });
  
      if (!(await schema.isValid(req.body))) {
        throw new ValidationError();
      }
  
      const { userId, courseId, couponCode, bkashTransactionId } = req.body;
  
      const user = await User.findByPk(userId);
      const course = await Course.findByPk(courseId);
      const coupon = await Coupon.findOne({ where: { code: couponCode, courseId, used: false } });
  
      if (!user || !course || (!coupon && !bkashTransactionId)) throw new BadRequestError();
  
      user.registeredCourses.push(courseId);
  
      if (coupon) {
        coupon.used = true;
        await coupon.save();
      }
  
      await user.save();
  
      await PurchaseHistory.create({
        userId,
        courseId,
        paymentType: coupon ? 'Coupon' : 'Bkash',
        couponId: coupon ? coupon.id : null,
        bkashTransactionId: bkashTransactionId || null,
      });
  
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  unregisterToCourse: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        userId: Yup.string().required(),
        courseId: Yup.string().required(),
      });
  
      if (!(await schema.isValid(req.body))) {
        throw new ValidationError();
      }
  
      const { userId, courseId } = req.body;
  
      const user = await User.findByPk(userId);
      const course = await Course.findByPk(courseId);
  
      if (!user || !course) throw new BadRequestError();
  
      user.registeredCourses = user.registeredCourses.filter(
        (courseId) => courseId !== courseId
      );
  
      await user.save();
  
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  generateCoupon: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        courseId: Yup.string().required(),
        discount: Yup.number().required(),
      });

      if (!(await schema.isValid(req.body))) {
        throw new ValidationError();
      }

      const { courseId, discount } = req.body;

      // Check if the course exists
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new BadRequestError('Course not found');
      }

      // Generate a unique coupon code
      const code = uuidv4();

      // Create the coupon
      const coupon = await Coupon.create({
        code,
        discount,
        courseId,
      });

      return res.status(201).json(coupon);
    } catch (error) {
      next(error);
    }
  },
  publish: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);

      if (!course) throw new BadRequestError();

      if (course.author !== req.user.id) throw new BadRequestError("Unauthorized");

      course.published = true;
      await course.save();

      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  depublish: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);

      if (!course) throw new BadRequestError();

      if (course.author !== req.user.id) throw new BadRequestError("Unauthorized");

      course.published = false;
      await course.save();

      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }
};

export default courseController;
