import User from "../Model/index.js";

import userSchema from "../Utils/userSchema.js";
import userLoginSchema from "../Utils/userLoginSchema.js";
import { encode, getPurePassword } from "../Utils/functions/encodePassword.js";
import reportJoiError from "../Utils/functions/reportError.js";
//import userAuth from "../middlewares/userAuth.js";

const userRegistration = async (req, res) => {
  try {
    const inputValidation = userSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);
    req.body.password = await encode(req.body.password);
    const user = await User.create(req.body);
    if (user) {
      res.status(200).json({
        result: req.body,
        message: "inserting data successful",
      });
    } else {
      res.status(404).json({
        message: "inserting data failed",
      });
    }
  } catch (error) {
    console.log("internal server error", error);
  }
};
/**const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const inputValidation = userLoginSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(401).send(`Incorrect username or password(user)`);
    const decodedPassword = await getPurePassword(password, user.password);

    if (password != decodedPassword)
      return res.status(401).send(`Incorrect username or password`);

    let userInfo = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return userAuth(userInfo, res);
  } catch (error) {
    console.log(error);
    res.send(`500 Server Error : `, error);
  }
};
**/
const getUser= async (req,res)=>{
  try {
    const id=req.params.id
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json({
        result: user
      });
    } else {
      res.status(404).json({
        message: "User not found"
      });
    }
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

const updateUser= async(req,res)=>{
  try {
    const id=req.params.id;
    const inputValidation = userSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);
    req.body.password = await encode(req.body.password);
    const userUpdate = await User.updateOne({ _id: id },req.body);

    if (userUpdate) {
      res.status(200).json({
        result: req.body,
        message: "updating data successful",
      });
    } else {
      res.status(404).json({
        message: "updating data failed",
      });
    }
  } catch (error) {
    console.log("internal server error", error);
  }
};
 const deleteUser=async(req,res)=>{

try{
  const id=req.params.id;
  const user = await User.deleteOne({ _id: id });
  if (user) {
    res.status(200).json({
      result: user
    });
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
} catch (error) {
  console.error("Error while deleting user:", error);
  res.status(500).json({
    message: "Internal server error"
  });
}
 }
export { userRegistration,/**userLogin,**/getUser,updateUser,deleteUser };
