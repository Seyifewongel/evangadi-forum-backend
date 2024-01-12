require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./server/config/database");
const userRouter = require('./server/api/users/user.router')
const questionRouter = require('./server/api/question/question.router')
const answerRouter = require('./server/api/answer/answer.router')
const forgotRouter=require('./server/api/forgotPassword/forgotPassword.route')
const port = process.env.PORT;

// initialize the server
const app = express();

// Middlewares
app.use(cors());
//  A middleware built to parse the incoming requests
app.use(express.urlencoded({ extended: true }));
// A midleware parse the request in json format
app.use(express.json());

// to make the router run in the server
app.use('/api/users', userRouter)
app.use('/api/questions', questionRouter)
app.use('/api/answers', answerRouter)
app.use("/api/forgotPassword", forgotRouter);

// Listening port
app.listen(port, () => console.log(`Listening to http://localhost:${port}`));
