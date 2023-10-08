import {Router} from "express";
import logger from "../config/logger";
import { createProxyMiddleware} from "http-proxy-middleware";

export const routes = Router();

const proxyDiaryOptions = {
	target: "http://localhost:3003", // DIARY URL
	changeOrigin: true, // Needed for virtual hosted sites
	pathRewrite: {
		"^/diary": "", // Remove the '/diary' prefix when forwarding requests to the microservice
	},
};

const proxyDiary = createProxyMiddleware(proxyDiaryOptions);
routes.use("/diary", proxyDiary);

routes.get("/", (req,res) => {
	logger.error("this is an error log");
	logger.warn("this is an warn log");
	logger.info("this is an info log");
    
	return res.status(200).json("ok");
} );