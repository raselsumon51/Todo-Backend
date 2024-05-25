const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);


mongoose.connect("mongodb+srv://raselsumon51:enPAmPa3oRxTsOCW@cluster0.nngte0p.mongodb.net/todo?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);


//Models
const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    // console.log(todos);
    res.json(todos);
});

app.post("/todo/new", async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ result });
})

app.get('/todo/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.save();
    res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
    await todo.save();
    res.json(todo)
})

app.listen(3008);