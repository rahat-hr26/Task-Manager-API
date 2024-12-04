import UsersModel from "../model/Usermodel.js";
import { EncodeToken } from "../utility/tokenUtility.js";
import EmailSend from "../utility/emailUtility.js";

// Registration code ===================>

export const Registration = async (req, res) => {
	try {
		let reqBody = req.body;
		await UsersModel.create(reqBody);

		return res.json({
			status: "success",
			Message: "User registered successfully",
		});
	} catch (err) {
		return res.json({ status: "fail", Message: err.toString() });
	}
};






// Login code ===================>

export const Login = async (req, res) => {
	try {
		let reqBody = req.body;
		let data = await UsersModel.findOne(reqBody);
		if (data === null) {
			return res.json({ status: "fail", Message: "user not found" });
		} else {
			let token = EncodeToken(data["email"], data["_id"]);
			return res.json({
				status: "success",
				Token: token,
				Message: "User login successfull",
			});
		}

		return res.json({
			status: "success",
			Message: "User Login successfully",
		});
	} catch (err) {
		return res.json({ status: "fail", Message: err.toString() });
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
	} catch (err) {
		return res.json({ status: "fail", Message: err.toString() });
	}
};









// ProfileUpdate code ===================>

export const ProfileUpdate = async (req, res) => {
	try {
		let reqBody = req.body;
		let user_id = req.headers["user_id"];
		await UsersModel.updateOne({ _id: user_id }, reqBody);

		return res.json({
			status: "success",
			Message: "User ProfileUpdate successfully",
		});
	} catch (err) {
		return res.json({ status: "fail", Message: err.toString() });
	}
};






// EmailVerify code ===================>


export const EmailVerify = async (req, res) => {

try {
	let email = req.params.email;
	let data = await UsersModel.findOne({ email: email });
	if (data == null) {
		return res.json({ status: "fail", Message: "user email dose not exist" });
	} else {
		let code = Math.floor(100000 + Math.random() * 900000);
		let EmailTo = data["email"];
		let EmailText = "Your Code Is" + code;
		let EmailSubject = "Task Manager Verification Code";
		await EmailSend(EmailTo, EmailText, EmailSubject);
		await UsersModel.updateOne({ email: email }, { otp: code });
		return res.json({
			status: "success",
			Message: "User  EmailVerify successfully, Check Email",
		});
	}
} catch (err) {
	return res.json({ status: "fail", Message: err.toString() });
}


};






// EmailVerify code ===================>



export const CodeVerify = async (req, res) => {
try {
let email = req.params.email;
let code = req.params.code;
let data = await UsersModel.findOne({ email: email, otp: code });
if (data == null) {
	return res.json({
		status: "fail",
		Message: "Wrong Code",
	});
} else {
	return res.json({
		status: "success",
		Message: "User CodeVerify successfully",
	});
}

} catch(err){
return res.json({ status: "fail", Message: err.toString() });
}
};





// EmailVerify code ===================>

export const ResetPassword = async (req, res) => {

try{
let reqBody=req.body;
let data = await UsersModel.findOne({
	email: reqBody["email"],
	otp: reqBody["code"],
});
if (data == null) {
	return res.json({
		status: "fail",
		Message: "Wrong Verification code",
	});
} else {
	await UsersModel.updateOne({email:reqBody["email"]},{
		otp:"0", password:reqBody["password"],
	})
		return res.json({
			status: "success",
			Message: "User ResetPassword successfully",
		});
}

} catch(err){
	return res.json({ status: "fail", Message: err.toString() });
}


	

};
