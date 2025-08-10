const express = require("express");
const app = express();
const serverless = require("serverless-http");

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello from API server !!!");
});

module.exports.handler = serverless(app);
