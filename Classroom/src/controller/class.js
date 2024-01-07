import Class from "../Model/Class.js";
import  classSchema  from "../utils/classValid.js";
import reportJoiError from "../utils/functions/reportError.js";

const addClass = async (req, res) => {
  try {
    const classValidation = classSchema.validate(req.body);

    if (classValidation.error) {
      return reportJoiError(classValidation, res);
    }
    const savedClass = await Class.create(req.body);

    if (savedClass) {
      res.status(200).json({
        result: savedClass,
        message: "Class created successfully",
      });
    } else {
      res.status(500).json({
        message: "Failed to create the class",
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getClass = async (req, res) => {
  try {
    const id = req.params.id;

    const Grade = await Class.findOne({ _id: id }).populate('students');
    if (Grade) {
      res.status(200).json({
        result: Grade,
      });
    } else {
      res.status(500).json({
        message: "Failed to fetch the class",
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const classValidation = classSchema.validate(req.body);
    if (classValidation.error) return reportJoiError(inputValidation, res);
    const updateGrade = await Class.updateOne({ _id: id }, req.body);

    if (updateGrade) {
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
const deleteClass=async(req,res)=>{

  try{
    const id=req.params.id;
    const removeGrade = await Class.deleteOne({ _id: id });
    if (removeGrade) {
      res.status(200).json({
        result: removeGrade
      });
    } else {
      res.status(404).json({
        message: "Grade not found"
      });
    }
  } catch (error) {
    console.error("Error while deleting Grade:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
   }

export { addClass, getClass, updateClass,deleteClass };
