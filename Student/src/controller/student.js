import Student from "../Model/Student.js"
import Class from "../../../Classroom/src/Model/Class.js";
import { studentSchema,studentLoginSchema } from "../utils/studentSchema.js"
import { encode, getPurePassword } from "../Utils/functions/encodePassword.js";
import reportJoiError from "../Utils/functions/reportError.js";
//import studentAuth from "../middlewares/studentAuth.js";


const addStudent=async(req,res)=>{
    try {
        const inputValidation = studentSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);
    req.body.password = await encode(req.body.password);
    const newStudent = await Student.create(req.body);

    await Class.findByIdAndUpdate(req.body.class, { $push: { students: newStudent._id } });
    if (newStudent) {
        res.status(200).json({
          result: req.body,
          message: "inserting student successful",
        });
      } else {
        res.status(404).json({
          message: "inserting student failed",
        });
      }
    } catch (error) {
      console.log("internal server error", error);
    }

}
/**const studentLogin=async(req,res)=>{
    try {
        const { body } = req;
        const { email, password } = body;
    
        const inputValidation = studentLoginSchema.validate(req.body);
        if (inputValidation.error) return reportJoiError(inputValidation, res);
        const loginStudent = await Student.findOne({ email: email });
    
        if (!loginStudent )
          return res.status(401).send(`Incorrect username or password(user)`);
        const decodedPassword = await getPurePassword(password, loginStudent.password);
    
        if (password != decodedPassword)
          return res.status(401).send(`Incorrect username or password`);
    
        let studentInfo = {
          names: loginStudent.names,
          email: loginStudent.email,
          password: loginStudent.password,
        };
        return studentAuth(studentInfo, res);
      } catch (error) {
        console.log(error);
        res.send(`500 Server Error : `, error);
      }
}
**/
const getStudent=async(req,res)=>{
    try {
        const id=req.params.id
        const student = await Student.findOne({ _id: id }).populate('class');
        if (student) {
          res.status(200).json({
            result: student
          });
        } else {
          res.status(404).json({
            message: "student not found"
          });
        }
      } catch (error) {
        console.error("Error while fetching student:", error);
        res.status(500).json({
          message: "Internal server error"
        });
      }
}
const updateStudent=async(req,res)=>{
    try {
        const id=req.params.id
        const inputValidation = studentSchema.validate(req.body);
        if (inputValidation.error) return reportJoiError(inputValidation, res);
        req.body.password = await encode(req.body.password);
        const updatedStudent = await Student.updateOne({ _id: id },req.body);
    
        await Class.findByIdAndUpdate(req.body.class, { $push: { students: updatedStudent._id } });
        if (updatedStudent) {
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
const deleteStudent=async(req,res)=>{
    try {
        const id=req.params.id;
        const studentToPop = await Student.deleteOne({ _id: id });
        if (studentToPop) {
          res.status(200).json({
            result: studentToPop
          });
        } else {
          res.status(404).json({
            message: "student not found"
          });
        }
      } catch (error) {
        console.error("Error while deleting student:", error);
        res.status(500).json({
          message: "Internal server error"
        });
      }
}
export {addStudent,/**studentLogin,**/getStudent,deleteStudent,updateStudent}