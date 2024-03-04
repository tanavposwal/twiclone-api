import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
export const SECRET = 'SECr3t';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  let token;
  if (authHeader) {
    token = authHeader;
  }

  if (token != undefined) {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      
      // returns user id to api as header which is parsed from jwt
      req.headers["userId"] = payload.id;
      req.headers["userName"] = payload.username;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};


