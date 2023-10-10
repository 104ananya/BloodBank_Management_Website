const express = require("express");
const dotenv = require("dotenv");
// const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors"); // for cross origin requests
const connectDB = require("./config/db");

//.env config
// // dotenv.config({ path: './config/config.env' })
dotenv.config();

// mongoDb connection
connectDB();

// rest object create - we need to store all express feature into a variable
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
//test route
/*
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to Blood Bank App",
//   }); 
// });
*/

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use('/api/v1/auth',require('./routes/authRoutes'));

// port
const PORT = process.env.PORT || 8080;

//listen method call
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${process.env.DEV_MODE} mode.`);
});
