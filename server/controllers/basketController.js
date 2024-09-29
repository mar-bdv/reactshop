
const { BasketDevice, Basket, Device } = require('../models/models');


class BasketController {
    // Добавление товара в корзину
    async addToBasket(req, res) {
        const { userId, deviceId, quantity = 1 } = req.body;

        // Находим корзину по userId
        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        // Проверяем, есть ли уже этот товар в корзине
        let basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });

        if (basketDevice) {
            // Обновляем количество, если товар уже в корзине
            basketDevice.quantity += quantity;
            await basketDevice.save();
        } else {
            // Если товара нет в корзине, создаем новую запись
            basketDevice = await BasketDevice.create({
                basketId: basket.id,
                deviceId,
                quantity
            });
        }

        return res.json(basketDevice);
    }

    // Получение товаров корзины пользователя
    async getUserBasket(req, res) {
        const { userId } = req.params;
        console.log("get user basket, userid:", userId)

        // Находим корзину пользователя
        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        // Находим товары в корзине, включая данные о товаре
        const basketDevices = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device, as: 'device' }] // Включаем данные о товаре
        });

        return res.json(basketDevices);
    }

    // // Обновление количества товара в корзине
    // async updateBasketItemQuantity(req, res) {
    //     const { id } = req.params; // Получаем id товара из параметров
    //     const { quantity } = req.body; // Получаем новое количество из тела запроса

    //     try {
    //         const basketDevice = await BasketDevice.findByPk(id); // Находим товар в корзине по id

    //         if (!basketDevice) {
    //             return res.status(404).json({ message: 'Товар не найден в корзине' });
    //         }

    //         // Обновляем количество товара
    //         basketDevice.quantity = quantity;

    //         // Если количество равно 0, удаляем товар из корзины
    //         if (quantity <= 0) {
    //             await basketDevice.destroy(); // Удаляем товар из корзины
    //             return res.status(204).send(); // Возвращаем статус 204 (Нет содержимого)
    //         }

    //         await basketDevice.save(); // Сохраняем изменения
    //         return res.status(200).json(basketDevice);
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Ошибка сервера' });
    //     }
    // }

    // // Удаление товара из корзины
    // async removeBasketItem(req, res) {
    //     const { id } = req.params; // Получаем id товара из параметров

    //     try {
    //         const basketDevice = await BasketDevice.findByPk(id); // Находим товар в корзине по id

    //         if (!basketDevice) {
    //             return res.status(404).json({ message: 'Товар не найден в корзине' });
    //         }

    //         await basketDevice.destroy(); // Удаляем товар из корзины
    //         return res.status(204).send(); // Возвращаем статус 204 (Нет содержимого)
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Ошибка сервера' });
    //     }
    // }

    // Обновление товара в корзине
    
    async updateBasket(req, res) {
        const { userId, deviceId, quantity } = req.body;

        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        const basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });
        
        if (basketDevice) {
            basketDevice.quantity = quantity;
            await basketDevice.save();
            return res.json(basketDevice);
        }

        return res.status(404).json({ message: "Item not found in basket" });
    }

    /*
    async addToBasket(req, res) {
        const { userId, deviceId, quantity = 1 } = req.body;

        // Находим корзину по userId
        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        // Проверяем, есть ли уже этот товар в корзине
        let basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });

        if (basketDevice) {
            // Обновляем количество, если товар уже в корзине
            basketDevice.quantity += quantity;
            await basketDevice.save();
        } else {
            // Если товара нет в корзине, создаем новую запись
            basketDevice = await BasketDevice.create({
                basketId: basket.id,
                deviceId,
                quantity
            });
        }

        return res.json(basketDevice);
    } */
    // Удаление товара из корзины
    async removeFromBasket(req, res) {
        const { userId, deviceId } = req.body;
        console.log("Basket Controller", userId, deviceId)
        if (!userId) {
            return res.status(400).json({ message: 'userId/basketId is missing' });
        } 
        if (!deviceId) {
            return res.status(400).json({ message: 'deviceId is missing' });

        }

    
        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        const basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });
        if (basketDevice) {
            await basketDevice.destroy({
                
            });
            return res.json({ message: "Item removed from basket" });
        }

        return res.status(404).json({ message: "Item not found in basket" });
    }

}



module.exports = new BasketController();
