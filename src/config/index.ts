import { config } from "dotenv";

config();

export const { PORT, ORIGIN, MONGO_HOST } = process.env;
