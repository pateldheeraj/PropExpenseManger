import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Try cookie first, then Authorization header as fallback
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ status: "error", message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Unauthorized: Invalid or expired token" });
  }
};

export default authMiddleware;
