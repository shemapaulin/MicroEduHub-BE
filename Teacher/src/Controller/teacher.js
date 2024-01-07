import Teacher from "../Model/Teacher.js";

import { teacherSchema,teacherLoginSchema } from "../Utils/teacherValid.js";
import reportJoiError from "../Utils/functions/reportError.js";
import { encode,getPurePassword } from "../Utils/functions/encodePassword.js";
//import teacherAuth from "../middlewares/TeacherAuth.js";

const addTeacher=async(req,res)=>{
    try {
        const inputValidation=teacherSchema.validate(req.body);
        if(inputValidation.error) return reportJoiError(inputValidation);
        req.body.password = await encode(req.body.password);
        const createTeacher=await Teacher.create(req.body);

        if(createTeacher){
            res.status(200).json({
                message:"member added succesfully",
                result:createTeacher
            })
        }else{
            res.status(404).json({
                message:"could not add new member"
            })
        }
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}
/**const TeacherLogin=async(req,res)=>{
    try {
        const { body } = req;
        const { email, password } = body;
    
        const inputValidation = teacherLoginSchema.validate(req.body);
        if (inputValidation.error) return reportJoiError(inputValidation, res);
        const loginTeacher= await Teacher.findOne({ email: email });
    
        if (!loginTeacher )
          return res.status(401).send(`Incorrect username or password(user)`);
        const decodedPassword = await getPurePassword(password, loginTeacher.password);
    
        if (password != decodedPassword)
          return res.status(401).send(`Incorrect username or password`);
    
        let teacherInfo = {
          names: loginTeacher.names,
          email: loginTeacher.email,
          password: loginTeacher.password,
        };
        return teacherAuth(teacherInfo, res);
      } catch (error) {
        console.log(error);
        res.send(`500 Server Error : `, error);
      }
}**/
const getTeacher=async(req,res)=>{
    try {
        const id=req.params.id
        const getTeacher= await Teacher.findOne({ _id: id }).populate('Assignment');
        if (student) {
          res.status(200).json({
            result: getTeacher
          });
        } else {
          res.status(404).json({
            message: "teacher not found"
          });
        }
      } catch (error) {
        console.error("Error while fetching teacher:", error);
        res.status(500).json({
          message: "Internal server error"
        });
      }
}
const updateTeacher=async(req,res)=>{
    try {
        const id=req.params.id
        const inputValidation = teacherSchema.validate(req.body);
        if (inputValidation.error) return reportJoiError(inputValidation, res);
        req.body.password = await encode(req.body.password);
        const updateTeacher = await Teacher.updateOne({ _id: id },req.body);
    
        
        if (updateTeacher) {
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
}
const deleteTeacher=async(req,res)=>{
    try {
        const id=req.params.id;
        const teacherToPop = await Student.deleteOne({ _id: id });
        if (studentToPop) {
          res.status(200).json({
            result: teacherToPop
          });
        } else {
          res.status(404).json({
            message: "teacher not found"
          });
        }
      } catch (error) {
        console.error("Error while deleting teacher:", error);
        res.status(500).json({
          message: "Internal server error"
        });
      }
}
export {addTeacher,getTeacher,updateTeacher,deleteTeacher}