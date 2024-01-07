import { Router } from "express";

import {  addTeacher, deleteTeacher, getTeacher, updateTeacher } from "../Controller/teacher.js";

const router=Router();


router.post("/addTeacher",addTeacher);
//router.post("/teacherLogin",TeacherLogin);
router.get("getTeacher/:id",getTeacher)
router.put("/updateTeacher/:id",updateTeacher);
router.put("/deleteTeacher/:id",deleteTeacher);


const teacherRoute=router;

export default teacherRoute;