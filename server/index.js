// import { express } from 'express'
const express = require('express')
const mongoose = require('mongoose')

const app = express();
mongoose.connect('mongodb://localhost:27017/mystylist')
.then(() => {
    console.log("Db Connection made to Mystylist")
})
.catch((err) => {
    console.log("Error while connecting to mongo-db")
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("Hello from the express backend")
})

app.listen('8080', () => {
    console.log("Server listening on Port 8080")
})