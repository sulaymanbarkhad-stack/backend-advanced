import jwt from "jsonwebtoken"; // Library for creating JSON Web Tokens (JWT)

export const generatingtoken = (user) => {
    // Create the payload with user ID and role
    const payload = { _id: user._id, role: user.role };

    // Generate JWT token using secret and expiration from environment variables
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREIN
    });

    return token; // Return the generated token
}