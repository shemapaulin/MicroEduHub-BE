import Assignment from "../Models/assignment.js";
import Teacher from "../../../Teacher/src/Model/Teacher.js"
import  assignmentSchema  from "../utils/assignent.js";
import reportJoiError from "../Utils/functions/reportError.js";


const createAssignment = async (req, res) => {
  try {
    const assi_Validation = assignmentSchema.validate(req.body);

    if (assi_Validation.error) {
      return reportJoiError(assi_Validation, res);
    }
    const assi_create = await Assignment.create(req.body);
    await Teacher.findByIdAndUpdate(req.body.teacher, {
      $push: { assignments: assi_create._id },
    });
    const editForClass = await Class.findByIdAndUpdate(req.body.class, {
      $push: { Assignments: assi_create._id },
    });

    if (assi_create) {
     

      res.status(200).json({
        result: assi_create,
        message: "Assignment created successfully",
      });
    } else {
      res.status(500).json({
        message: "Failed to create the assignment",
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const assaignment = await Assignment.findOne({ _id: id })
      .populate("class")
      .populate("teacher");
    if (assaignment) {
      res.status(200).json({
        result: assaignment,
      });
    } else {
      res.status(404).json({
        message: "assignment not found",
      });
    }
  } catch (error) {
    console.error("Error while fetching assignment:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updateAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const inputValidation = assignmentSchema.validate(req.body);
    if (inputValidation.error) return reportJoiError(inputValidation, res);
    const updatedAssign = await Assignment.updateOne({ _id: id }, req.body);

    await Teacher.findByIdAndUpdate(req.body.teacher, {
      $push: { assignments: updatedAssign._id },
    });
    const editForClass = await Class.findByIdAndUpdate(req.body.class, {
      $push: { Assignments: updatedAssign._id },
    });
    if (updatedAssign) {
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
const deleteAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const assignToPop = await Assignment.deleteOne({ _id: id });
    if (assignToPop) {
      res.status(200).json({
        result: assignToPop,
      });
    } else {
      res.status(404).json({
        message: "assignment not found",
      });
    }
  } catch (error) {
    console.error("Error while deleting assignment:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export { createAssignment, getAssignment, deleteAssignment, updateAssignment };
