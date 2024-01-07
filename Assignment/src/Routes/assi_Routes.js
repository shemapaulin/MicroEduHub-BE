import { Router } from "express";

import { createAssignment, deleteAssignment, getAssignment, updateAssignment } from "../controller/assignment.js"

const router=Router();

router.post("/addAssignment",createAssignment)
router.put("/editAssignment/:id",updateAssignment)
router.get("/getAssignment/:id",getAssignment)
router.delete("/deleteAssignment/:id",deleteAssignment)
const AssignmentRoutes=router;
export default AssignmentRoutes;