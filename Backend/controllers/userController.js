import User from '../models/userModel.js';
import asyncHandler from '../middlewears/asyncHandler.js';
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.js';




const createUser = asyncHandler(async (req, res) => {
  const { username, password, email, isAdmin } = req.body;

  try {
    // Check if required fields are provided
    if (!username || !email || !password) {
      return res.status(400).send("Please fill all inputs");
    } 

    // Check if user already exists
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword, isAdmin });

    // Save the user to the database
    await newUser.save();

    // Generate token for the new user
    const token = createToken(res, newUser._id, process.env.JWT_SECRET);

    // Respond with success and user data
    return res.status(201).json({
      token,
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    });
  } catch (error) {
    // Handle errors
    return res.status(400).send(error.message || "Invalid user data");
  }
});
 
const loginUser = async (req, res) => {
  const { email , password } = req.body;
  
  try {
    // Check if a user with the provided email exists
    const existingUser = await User.findOne({ email });
    
    // If no user found with the given email, return an error
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    // If the passwords don't match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    // If both email and password are correct, generate a token and return user data
    const token = createToken(res, existingUser._id, process.env.JWT_SECRET);

    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("jwt"); // Clear the JWT cookie
  res.status(200).json({ message: "Logout successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


const getCurrentUserProfile = asyncHandler( async (req,res) =>{
        const user = await User.findById(req.user._id);
        if(user){
          res.json({
            _id:user._id,
            username:user.username,
            email:user.email
          });
        }
          else{
             res.status(404);
              throw new Error("User not found.")
          }
        
})



const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


const deleteUserById = asyncHandler(async(req, res) => {
  
  console.log("Request _id:", req.params.id);

  const user = await User.findById(req.params.id);
  
  console.log("User:", user);

  if (user) {
      if(user.isAdmin){
          res.status(400);
          throw new Error("Admin cannot delete");
      }
      await User.deleteOne({_id:user._id});
      res.json({message:"userRemoved"});
  } else {
      res.status(404);
      throw new Error("User not found");
  }

});


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();
      res.json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin
      });
  } else {
      res.status(404);
      throw new Error("User not found");
  }
});







export { createUser, loginUser,
   logOut, getAllUsers,
   getCurrentUserProfile,
   updateCurrentUserProfile,
   deleteUserById,
   getUserById ,
  updateUserById};
