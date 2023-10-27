import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const proxyAuthOptions = {
	target: "https://auth-y71l.onrender.com", // Auth URL
	changeOrigin: true, // Needed for virtual hosted sites
	pathRewrite: {
		"^/auth": "", // Remove the prefix when forwarding requests to the microservice
	},
	onProxyReq: fixRequestBody,
};

export const proxyAuth = createProxyMiddleware(proxyAuthOptions);
