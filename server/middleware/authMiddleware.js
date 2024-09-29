const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Токен отсутствует, не авторизован" });
        }

        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: "Токен не найден, не авторизован" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (e) {
        return res.status(401).json({ message: "Токен недействителен или истёк" });
    }
};
