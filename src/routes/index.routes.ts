import {Router} from "express";
import logger from "../config/logger";
import { proxyDiary } from "../proxy/diary.proxy";

export const routes = Router();

routes.use("/diary", proxyDiary);

routes.get("/", (req,res) => {
	logger.error("this is an error log");
	logger.warn("this is an warn log");
	logger.info("this is an info log");
    
	return res.status(200).json("ok");
} );