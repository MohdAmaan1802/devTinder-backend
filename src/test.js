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
//get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   // try {
//   //   const user = await User.findOne({ emailId: userEmail });
//   //   if (!user) {
//   //     res.status(404).send("User not found");
//   //   } else {
//   //     res.send(user);
//   //   }
//   // } catch (err) {
//   //   console.error("Error fetching user:", err);
//   //   res.status(500).send("Error fetching user");
//   // }

//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).send("Error fetching users");
//   }
// });

// //feed API - GET /feed -get all the users from the database
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).send("Error fetching users");
//   }
// });

// //delete a user
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User deleted successfully");
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).send("Error deleting user");
//   }
// });
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

//     const isupdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isupdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (!skills.length > 10) {
//       throw new Error("Skills should not exceed then 10 items");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log("User updated:", user);
//     res.send("User updated successfully");
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res.status(500).send("Error updating user" + err.message);
//   }
// });
