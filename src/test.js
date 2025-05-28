const express = require("express");

const app = express();

const { adminAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("all data sent ");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});
// bc is optional so ad
// app.get("/a(bc)?d", (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" }); // Send a response to the client
// });

// //it wil run ab amaan cd in between anything
// app.get("/ab*cd", (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" }); // Send a response to the client
// });

// //it will run as abbbc but not as abbcc
// app.get("/ab+c", (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" }); // Send a response to the client
// });

// //it will run even as ac in route
// app.get("/ab?c", (req, res) => {
//   res.send({ firstName: "John", lastName: "Doe" }); // Send a response to the client
// });

//this will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" }); // Send a response to the client
});

// app.post("/user", (req, res) => {
//   res.send("data successfully saved to the db");
// });

//this will match all the http methods api calls to /test
// app.use("/test", (req, res) => {
//   // Middleware function to handle requests aka request handler
//   res.send("hello from server"); // Send a response to the client
// });

// app.use("/", (req, res) => {
//   // Middleware function to handle requests aka request handler
//   res.send("hello from server"); // Send a response to the client
// });
app.listen(7000, () => {
  console.log("Server is running on port 3000");
});
