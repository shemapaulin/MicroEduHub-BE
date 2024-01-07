import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  Assignments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignments",
    }
  ]
});

const Class = mongoose.model("Class", classSchema);

export default Class;
