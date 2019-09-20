const express = require('express');
const app = express();


// Lists
app.get('/lists', (req, res) => {
  res.send("hello man")
})

app.post('/lists', (req, res) => {

})

app.patch('/lists/:id', (req, res) => {

})

app.delete('/lists/:id', (req, res) => {

})


app.listen(8080, () => {
  console.log("server is run on 8080");
})