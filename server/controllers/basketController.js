const { BasketDevice, Basket, Device } = require('../models/models');

class BasketController {
    async addToBasket(req, res) {
        const { userId, deviceId, quantity = 1 } = req.body;

        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        let basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });

        if (basketDevice) {
            basketDevice.quantity += quantity;
            await basketDevice.save();
        } else {
            basketDevice = await BasketDevice.create({
                basketId: basket.id,
                deviceId,
                quantity
            });
        }

        return res.json(basketDevice);
    }

    async getUserBasket(req, res) {
        const { userId } = req.params;

        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        const basketDevices = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device, as: 'device' }] 
        });

        return res.json(basketDevices);
    }

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

    
    async removeFromBasket(req, res) {
        const { userId, deviceId } = req.body;
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
