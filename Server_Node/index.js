const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(cors());
app.use(morgan("combined"));

app.use(bodyParser.json());

const taskopration = require("./server");

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the API" });
});


app.get("/getTaskList", taskopration.getTasks);
app.post("/addTask", taskopration.addTask);
app.put("/update/:id", taskopration.updateTask);
app.delete("/delete/:id", taskopration.deleteTask);
// app.delete("/deleteAllTask", taskopration.deleteAllTask);
app.get("/getTaskList/:id", taskopration.actiontask);
app.delete("/removeAllCheckedTodo", taskopration.removeAllCheckedTodo);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "404 Not Found" });
});

app.listen(9000, () => {
  console.log("Server started on port 9000");
});