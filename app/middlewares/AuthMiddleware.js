import { DecodeToken } from "../utility/tokenUtility.js";


export default (req, res, next) => {
    let token=req.headers["token"]
    let decoded= DecodeToken(token)
  if(decoded===null){
    res.status(401).send ({status:"fail", Message:"Unauthorized"})
  }
else{
	// Retrive From token
	let email = decoded.email;
	let user_id = decoded.user_id;


	// Add With Req Header
	req.headers.email = email;
	req.headers.user_id = user_id;

	next();
}

}