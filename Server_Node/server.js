const { v4: uuidv4 } = require("uuid");

let taskList = [];
let newtaskList =[];
exports.getTasks = (req, res) => {
  res.status(200).json({ status: "success", data: taskList });
};

exports.updateTask = (req, res) => {
  let id = req.params.id;
  let task = taskList.find((t) => t.id === id);
  if (task) {
    task.completed = req.body.completed;
    task.activeStatus = req.body.activeStatus;
    res.status(200).json({ status: "success", data: taskList });
  } else {
    res.status(404).json({ status: "error", message: "Task not found" });
  }
};


exports.addTask = (req, res) => {
  let task = {
   Itemname: req.body.Itemname,
    completed: req.body.completed,
    activeStatus: req.body.activeStatus,
    id: uuidv4(),
  };
  taskList.push(task);
  res.status(200).json({ status: "success", data: task, taskList:taskList });
};

exports.deleteTask = (req, res) => {
  let id = req.params.id;
  taskList = taskList.filter((t) => t.id !== id);
  res.status(200).json({ status: "success", message: "Task deleted" });
};

exports.removeAllCheckedTodo = (req, res) => {
   taskList = taskList.filter((t) => !t.completed);
   res.status(200).json({ status: "success", message: "checked task deleted" });
};

// exports.deleteAllTask = (req, res) => {
//    taskList = [];
//    res.status(200).json({ status: "success", message: "checked task deleted" });
// };


exports.actiontask = (req, res) => {
    let id = req.params.id;
    console.log(id+"==nnnnnn==");
    if(id=="activeStatus"){
     newtaskList = taskList.filter((t) => t.activeStatus==true);
    }else if (id=="completed"){
     newtaskList = taskList.filter((t) => t.completed==true);
    }else{
     newtaskList = taskList
    }
    
    res.status(200).json({ status: "success", message: "Action Task",data: newtaskList });
};

