const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// for add new todo 
router.post(
  "/todo", async (req, res) => {
    try {
      const newTodo = new Todo({
        data: req.body.data,
        createdAt: Date.now(),
      });
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// for fetching all ToDo
router.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({'createdAt':-1});
    res.json(todos);
    // console.log(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// for mark ToDo 
router.get("/todo/:id", async (req, res) => {
  try {
    const todoRef = await Todo.findById(req.params.id);
    const todo = await Todo.findOneAndUpdate(
      {_id : req.params.id},
      {done : !todoRef.done}
    )
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// for update ToDo 
router.put("/todo/:id", async (req, res) => {
  try {
     await Todo.findByIdAndUpdate(
      {_id : req.params.id},
      {data : req.body.data}
    )
    const todo = await Todo.findById(req.params.id);

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// for delete ToDo router 
router.delete("/todo/:id", async (req, res) => {
  try {
     const todo = await Todo.findByIdAndDelete(req.params.id)
    // return res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
