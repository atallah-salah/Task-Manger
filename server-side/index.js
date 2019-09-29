const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { List, Task, User } = require('./db/models');

const mongoose = require('./db/mongoose');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(bodyParser.json());


let verifySession = (req,res,next)=>{
  let refreshToken = req.header("x-refresh-token");

  let _id = req.header("_id");

  User.findByIdAndToken(_id,refreshToken).then(user=>{
    if(!user){
      return Promise.reject({
        "error":"User not found. Make sure that the refresh token and user id are correct"
      })
    }
    req.user_id = user._id;
    req.userObject = user;
    req.refreshToken = refreshToken;
    let isSessionValid = false;

    user.sessions.forEach(session => {
      if(session.token === refreshToken){
        if(User.hasRefreshTokenExpired(session.expiresAt)===false){
          isSessionValid = true;
        }
      }
    });

    if(isSessionValid){
      next();
    }else{
      return Promise.reject({
        "error":"Refresh token has expired pr the session is invalid"
      })
    }
  }).catch(error =>{
    res.status(401).send(error);
  })
}

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
      res.send({ "message": "Updated successfully." })
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

app.post("/users",(req,res)=>{
  let body = req.body;
  let newUser = new User(body);

  newUser.save().then(()=>{
    return newUser.createSession();
  }).then(refreshToken=>{
    return newUser.generateAccessAuthToken().then(accessToken=>{
      return {accessToken,refreshToken};
    })
  }).then(authTokens=>{
    res
    .header("x-refresh-token",authTokens.refreshToken)
    .header("x-access-token",authTokens.accessToken)
    .send(newUser);
    
  }).catch(error=>{    
    res.status(400).send(error);
  })
})


app.post("/users/login",(req,res)=>{
  let email = req.body.email;
  let password = req.body.password; 

  User.findByCredentials(email,password).then(user=>{
    return user.createSession().then(refreshToken=>{
      return user.generateAccessAuthToken().then(accessToken=>{
        return {accessToken,refreshToken};
      })
    }).then(authTokens=>{
      res
      .header("x-refresh-token",authTokens.refreshToken)
      .header("x-access-token",authTokens.accessToken)
      .send(user);
    })
  }).catch(error=>{
    res.status(400).send(error);
  })
})

app.get("/users/me/access-token",verifySession,(req,res)=>{
  req.userObject.generateAccessAuthToken().then(accessToken=>{
    res.header("x-access-token",accessToken).send({accessToken})
  }).catch(error =>{
    res.status(400).send(error);
  })
})


app.listen(8080, () => {
  console.log("server is run on 8080");
})