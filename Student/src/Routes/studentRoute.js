import { Router } from "express";

import { addStudent,/**studentLogin,**/getStudent,updateStudent,deleteStudent } from "../Controller/student.js";

const router=Router();

router.post("/addStudent",addStudent)
//router.post("/StudentLogin",studentLogin)
router.get("/getStudent/:id",getStudent)
router.put("/updateStudent/:id",updateStudent)
router.delete("/deleteStudent/:id",deleteStudent)


const studentRoutes=router;
export default studentRoutes;