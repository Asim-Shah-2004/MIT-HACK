import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userAgent !== req.headers["user-agent"] || decoded.ip !== req.ip)
      return res.status(401).json({ message: "Token invalid due to device change" });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

export default authenticateToken;
