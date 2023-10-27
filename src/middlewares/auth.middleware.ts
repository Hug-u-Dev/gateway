import { Request, Response, NextFunction } from "express";
import { Unathorized } from "../commom/responses/responses";
import  Jwt  from "jsonwebtoken";

export interface IToken {
    userName: string,
    userID: string
}

const accesSecret = process.env.ACCESS_TOKEN_SECRET_KEY || "default_secret_key";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(" ")[1];
	try {
		if (!token) {
			throw new Unathorized("Nenhum token foi passado");
		}

		Jwt.verify(token, accesSecret, (err: any, deco: any) => {
			if (err) throw new Unathorized(err);
			const decoded:IToken = deco;

			if (decoded) {
				req.body.userName = decoded.userName;
				req.body.userId = decoded.userID;
				next();
			} else {
				throw new Unathorized("Token inválido ou expirado");
			}
		});
	} catch (err: any) {
		return res.status(401).json({ Error: err });
	}
}







