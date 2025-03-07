import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import expressService from "./services/express.service";
import sequelizeService from "./services/sequelize.service";
import awsService from "./services/aws.service";
dotenv.config();

const app = express();

// Enable CORS for all origins (you can customize this if needed)
app.use(cors());

const services = [expressService, awsService, sequelizeService];

(async () => {
  try {
    for (const service of services) {
      await service.init();
    }
    console.log("Server initialized.");
    //PUT ADITIONAL CODE HERE.
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
