import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = async (req, res, next) => {
  // const token = req.cookies.accessToken;
  // const token= await req.headers['X-AccessToken-Header'];
  const token= await req.headers.authorization.split(' ')[1];
  // const token = await req.headers['custom-header'];
  // console.log('token');
  // console.log(token);
  if (!token) return next(createError(401,"You are not authenticated! Access token not received"))


  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403,"Token is not valid!"))
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
  });
};
