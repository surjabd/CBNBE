import Content from "../models/Content";
import { BadRequestError, ValidationError } from "../utils/ApiError";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const fs = require('fs');

let contentController = {
  get: async (req, res, next) => {
    try {
      const course = await Content.findAll();

      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      console.log(req.body);
      const course = await Content.create(req.body);
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  
  find: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Content.findByPk(id,{ include: { all: true, nested: true } });

      if (!course) throw new BadRequestError();

      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Content.findByPk(id);
      if (!course) throw new BadRequestError();
      else{
        course.update(req.body);
        return res.status(200).json(course);  
      }   
    } catch (error) {
      next(error);
    }
  }
  , 
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Content.findByPk(id);
      if (!course) throw new BadRequestError();

      course.destroy();

      return res.status(200).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  },
  uploadtoS3: async (req, res, next) => {
    const fileContent = fs.readFileSync(req.file.path);
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEYID,
        secretAccessKey: process.env.AWS_SECRETKEY,
      },
    });
    const key = req.file.originalname.replace(/\s+/g, '-').toLowerCase();
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: fileContent,
      ContentLength: req.file.size,
      ACL: 'public-read'
    };
    
    try {
      const command = new PutObjectCommand(uploadParams);
      const data = await s3Client.send(command);
     
      const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      console.log("Success", fileUrl);
      return res.status(200).json({ s3Url: fileUrl });
    } catch (err) {
      console.log("Error", err);
      return res.status(500).json({ msg: "Error uploading file" });
    }
    
  }
}

export default contentController;
