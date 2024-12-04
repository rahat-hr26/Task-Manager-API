import TaskModel from "../model/TaskModel.js";
import mongoose from "mongoose";
//CreateTask ================>

export const CreateTask = async (req, res) => {
	try {
		let user_id = req.headers["user_id"];
		console.log(user_id);
		let reqBody = req.body;
		reqBody.user_id = user_id;
		await TaskModel.create(reqBody);
		return res.json({
			status: "success",
			Message: "User CreateTask successfully",
		});
	} catch (err) {
		return res.json({ status: "fail", Message: err.toString() });
	}
};


//UpdateTaskStatus ============>


export const UpdateTaskStatus = async (req, res) => {
	try {
		let id = req.params.id;
		let status = req.params.status;
		let user_id = req.headers["user_id"];
		await TaskModel.updateOne(
			{ _id: id, user_id: user_id },
			{
				status: status,
			}
		);
		return res.json({
			status: "success",
			Message: "User  UpdateTaskStatus successfully",
		});
	} catch (err) {
			return res.json({ status: "fail", Message: err.toString() });
	}
};




// TaskListByStatus==================>



export const TaskListByStatus = async (req, res) => {
	try{
let status = req.params.status;
let user_id = req.headers["user_id"];
let data = await TaskModel.find({ user_id: user_id }, { status: status });
return res.json({
	status: "success",
	data: data,
	Message: "User TaskListByStatus successfully",
});
	}catch(err){
	return res.json({ status: "fail", Message: err.toString() });
	}

};



// DeleteTask================>



export const DeleteTask = async (req, res) => {
try {
let id = req.params.id;
let user_id = req.headers["user_id"];
await TaskModel.deleteOne({ _id: id }, { user_id: user_id });

return res.json({
	status: "success",
	Message: "User DeleteTask  successfully",
});
} catch(err){
	return res.json({ status: "fail", Message: err.toString() });
}
};




//CountTask============>


export const CountTask = async (req, res) => {
	let ObjectID = mongoose.Types.ObjectId;
	let user_id = req.headers["user_id"];
	let user_id_object = new ObjectID(user_id);

	let data = await TaskModel.aggregate([
		{ $match: { user_id: user_id_object } },
		{ $group: { _id: "$status", sum: { $count: {} } } },
	]);

	return res.json({
		status: "success",
		data: data,
		Message: "User CountTask successfully",
	});
};



