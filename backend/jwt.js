const jwt = require("jsonwebtoken");

// Middleware to check JWT
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers["authorization"]; // safer
  console.log("===== JWT AUTH MIDDLEWARE =====");
  console.log("Authorization header received:", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("❌ Token not found or not in Bearer format");
    return res.status(401).json({ error: "Token not found" });
  }

  const token = authorization.split(" ")[1];
  console.log("Token extracted:", token);

  if (!token) {
    console.log("❌ Token is empty after splitting");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded successfully:", decoded);

    req.user = decoded; // attach user payload (id, role)
    next();
  } catch (err) {
    console.error("❌ JWT verification error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res.status(403).json({ error: "Invalid token" });
  }
};

// Function to generate JWT
const generateToken = (userData) => {
  console.log("===== GENERATING JWT =====");
  console.log("User data for token:", userData);

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "7d", // ✅ adjust to what you want: "30s", "1h", "7d"
  });

  console.log("Generated token:", token);
  return token;
};

module.exports = { jwtAuthMiddleware, generateToken };
