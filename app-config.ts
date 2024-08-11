import dotenv from "dotenv";
dotenv.config();

export default {
  sanityToken: process.env.SANITY_TOKEN || "",
  sanityDataset: process.env.SANITY_DATASET || "",
};
