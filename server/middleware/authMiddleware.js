// const jwt = require('jsonwebtoken')

// // проверка на наличие токена для авторизации

// module.exports = function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         next()
//     }
//     try {
//         const token = req.headers.authorization.split(' ')[1] // Bearer fgjkfdkg
//         if (!token) {
//             return res.status(401).json({message: "Не авторизован TRY authMiddleware"})

//         }

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decoded
//         next();
//     } catch (e) {
        
//         res.status(401).json({message: "Не авторизован Catch authMiddleware"})
//     }
// }

const jwt = require('jsonwebtoken');

// проверка на наличие токена для авторизации
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        // Проверяем наличие заголовка Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Токен отсутствует, не авторизован" });
        }

        const token = authHeader.split(' ')[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({ message: "Токен не найден, не авторизован" });
        }

        // Проверяем токен
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // добавляем данные пользователя в запрос
        next();
    } catch (e) {
        // Обрабатываем ошибки при неверном или истёкшем токене
        return res.status(401).json({ message: "Токен недействителен или истёк" });
    }
};
