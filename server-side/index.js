const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { List, Task } = require('./db/models');

const mongoose = require('./db/mongoose');

app.use(bodyParser.json());

// Models


// Lists
app.get('/lists', (req, res) => {
  List.find({}).then(lists => {
    res.send(lists)
  })
})

app.post('/lists', (req, res) => {
  let title = req.body.title;
  let newList = new List({
    title
  });

  newList.save().then(list => {
    res.send(list)
  })
})

app.patch('/lists/:id', (req, res) => {
  List.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  })
})

app.delete('/lists/:id', (req, res) => {
  List.findOneAndDelete({ _id: req.params.id }).then(() => {
    res.sendStatus(200);
  })
})

// Tasks
app.get('/lists/:listId/tasks', (req, res) => {
  Task.find({ _listId: req.params.listId }).then(tasks => {
    res.send(tasks)
  })
})

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then(task => {
    res.send(task)
  })
})

app.post('/lists/:listId/tasks', (req, res) => {
  let newTask = new Task({
    _listId: req.params.listId,
    title: req.body.title
  });

  newTask.save().then(task => {
    res.send(task)
  })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndUpdate({
    _id: req.params.taskId,
    _listId: req.params.listId
  }, {
      $set: req.body
    }).then(() => {
      res.sendStatus(200)
    })
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then(() => {
    res.sendStatus(200)
  })
})

app.listen(8080, () => {
  console.log("server is run on 8080");
})