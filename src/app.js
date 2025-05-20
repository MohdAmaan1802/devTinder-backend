const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  // Middleware function to handle requests aka request handler
  res.send("hello from server"); // Send a response to the client
});

app.use("/hello", (req, res) => {
  // Middleware function to handle requests aka request handler
  res.send("hello  from hell"); // Send a response to the client
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
