import { Router } from "express";
import { addClass,getClass, updateClass,deleteClass } from "../Controller/class.js";

const router=Router();

router.post("/createClass",addClass);
router.get("/getClass/:id",getClass);
router.put("/updateClass/:id",updateClass);
router.delete("/deleteClass/:id",deleteClass);


const classRoute=router;
export{classRoute};

