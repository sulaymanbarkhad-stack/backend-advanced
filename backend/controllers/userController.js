import bcrypt from "bcryptjs"; // Library for hashing passwords
import { User } from "../models/user.js"; // Import User model
import { generatingtoken } from "../utils/generatingtoken.js"; // Function to generate JWT token

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user with the same email already exists
        const userexist = await User.findOne({ email });
        if (userexist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving to DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token for the user
        const token = generatingtoken(user);

        // Send success response with user data and token
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user, // Note: hashed password is included here
            token,
        });
    } catch (error) {
        // Log the actual error to console for debugging
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const passwordmatch = await bcrypt.compare(password, user.password);

        if(!passwordmatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = generatingtoken(user);

        res.status(200).json({
            success: true,
            // message: "User logged in successfully",
            data:{
                _id: user._id,
                name: user.name,
                email: user.email,
                registerUser
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}