import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  // Add a reference to the Class collection
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
