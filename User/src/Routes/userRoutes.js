import { Router } from "express";
import {/**userLogin,**/ userRegistration,getUser, updateUser, deleteUser} from "../Controller/user.js";

const router = Router();

router.post("/user", userRegistration);
//router.post("/userLogin", userLogin);
router.get("/getUser/:id", getUser);
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser/:id", deleteUser)


const userRouter = router;
export default userRouter;
