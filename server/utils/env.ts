import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.SERVER_PORT ?? "8080");
const BASE_PATH = process.env.BASE_PATH ?? "";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "";
const FRONTEND_PATH = process.env.FRONTEND_PATH ?? "";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "";
const OAUTH_CONSUMER_KEY = process.env.OAUTH_CONSUMER_KEY ?? "";
const OAUTH_CONSUMER_SECRET = process.env.OAUTH_CONSUMER_SECRET ?? "";

export {
  PORT,
  BASE_PATH,
  FRONTEND_ORIGIN,
  FRONTEND_PATH,
  SESSION_SECRET,
  OAUTH_CONSUMER_KEY,
  OAUTH_CONSUMER_SECRET,
};
