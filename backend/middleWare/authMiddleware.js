import jwt from "jsonwebtoken";

 export const protecting = async (req, res, next) => {

    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1]
    }

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded

        next()
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }
}


export const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Only admin can access this route"
        });
    }

    next();
};