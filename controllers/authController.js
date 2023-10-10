const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// -----------------------------------XXXXXXXXXXXXXXXXXXXXXXX-----------------------------------------------

// FOR REGISTERATION CALLBACK FUNCTION

const registerController = async (req, res) => {
  try {
    // finding if email is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });

    // validation -- if user already exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already exists",
      });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // if email is new that is not previously registered -- new

    const user = new userModel(req.body); // creating the user
    await user.save(); // saving the user

    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// -----------------------------------XXXXXXXXXXXXXXXXXXXXXXX-----------------------------------------------

//FOR LOGIN CALLBACK FUNCTION

const loginController = async (req, res) => {
  try {
    // find the user with provided email
    const user = await userModel.findOne({ email: req.body.email });

    // if not present
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role doesn't match",
        
      });
    }

    // if user is present ---- then COMPARE password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // // console.log(comparePassword);

    // if password don't match
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// -----------------------------------XXXXXXXXXXXXXXXXXXXXXXX-----------------------------------------------

// GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });

    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current User",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
