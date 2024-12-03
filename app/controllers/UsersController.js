import UsersModel from "../model/Usermodel.js";
import { EncodeToken } from "../utility/tokenUtility.js";


// Registration code ===================>

export const Registration = async (req, res) => {
try {
let reqBody=req.body;
await UsersModel.create(reqBody)

	return res.json({
		status: "success",
		Message: "User registered successfully",
	});
}catch (err){
	return res.json ({status:"fail", "Message":err.toString()})

}

};




// Login code ===================>



export const Login = async (req, res) => {

try{
let reqBody=req.body;
let data =await UsersModel.findOne(reqBody);
if (data===null){
	return res.json({ status: "fail", "Message": "user not found" });

}
else {
let token = EncodeToken (data["email"], data["_id"]);
	return res.json({ status: "success",Token:token ,"Message": "User login successfull" });
}


return res.json({
	status: "success",
	Message: "User Login successfully",
});

}catch (err){
	return res.json({ status: "fail", "Message": err.toString() });

}

	
};













// Profile details code ===================>




export const ProfileDetails = async (req, res) => {

try {
	
 let user_id = req.header["user_id"];
 let data = await UsersModel.findOne({ id: user_id });

 return res.json({
		status: "success",
		Message: "User ProfileDetails successfully",
		data: data,
 });

} catch(err) {
		return res.json({ status: "fail", Message: err.toString() });

}

};








export const ProfileUpdate = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User ProfileUpdate successfully",
	});
};




export const EmailVerify = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User  EmailVerify successfully",
	});
};



export const CodeVerify = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User CodeVerify successfully",
	});
};




export const ResetPassword = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User ResetPassword successfully",
	});
};
