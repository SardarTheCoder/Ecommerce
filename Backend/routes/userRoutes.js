import express from "express";
import { createUser,
    logOut,
    loginUser,
    getAllUsers ,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from "../controllers/usercontroller.js";

const router = express.Router();
 import { authenticate,authorizeAdmin } from "../middlewears/authMiddleware.js";



router.route("/")
.post(createUser)
.get(authenticate,authorizeAdmin,getAllUsers);



http://localhost:5000/api/users/auth
router.post("/auth" , loginUser);
router.post("/logout",logOut);
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile)

//Admi routes
router.route('/:id').delete(authenticate,authorizeAdmin,deleteUserById,).get(authenticate,authorizeAdmin,getUserById).put(authenticate,authorizeAdmin,updateUserById)

export default router;