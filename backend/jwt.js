const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.get('authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not Found' });
    }

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: 'Invalid Token' });
    }
};

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
