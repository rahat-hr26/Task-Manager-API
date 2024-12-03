export const CreateTask = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User CreateTask successfully",
	});
};


export const UpdateTaskStatus = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User  UpdateTaskStatus successfully",
	});
};



export const TaskListByStatus = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User TaskListByStatus successfully",
	});
};





export const DeleteTask = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User DeleteTask  successfully",
	});
};



export const CountTask = async (req, res) => {
	return res.json({
		status: "success",
		Message: "User  CountTask  successfully",
	});
};
