const jwt = require('jsonwebtoken')

// проверка роли,

module.exports =  function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer fgjkfdkg
            if (!token) {
                return res.status(401).json({message: "Не авторизован TRY checkRole"})
    
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа checkRole"})
            }
            req.user = decoded
            next();
        } catch (e) {
            res.status(401).json({message: "Не авторизован Catch checkRole"})
        }
    }
}


