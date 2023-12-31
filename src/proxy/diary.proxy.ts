import {createProxyMiddleware, fixRequestBody} from "http-proxy-middleware";

const proxyDiaryOptions = {
	target: "http://localhost:3003", // DIARY URL
	changeOrigin: true, // Needed for virtual hosted sites
	pathRewrite: {
		"^/diary": "", // Remove the '/diary' prefix when forwarding requests to the microservice
	},
	onProxyReq: fixRequestBody,
};

export const proxyDiary = createProxyMiddleware(proxyDiaryOptions);
