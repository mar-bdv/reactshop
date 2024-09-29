// const Router = require('express');
// const { BasketDevice, Basket } = require('../models/models');
// const router = new Router();
// const basketController = require('../controllers/basketController')


// // // Добавить товар в корзину
// // router.post('/add', async (req, res) => {
// //     const { userId, deviceId, quantity } = req.body;
// //     const basket = await Basket.findOne({ where: { userId } });
    
// //     const basketDevice = await BasketDevice.create({
// //         basketId: basket.id,
// //         deviceId,
// //         quantity: quantity || 1
// //     });

// //     return res.json(basketDevice);
// // });

// // // Получить все товары в корзине пользователя
// // router.get('/:userId', async (req, res) => {
// //     const { userId } = req.params;
// //     const basket = await Basket.findOne({ where: { userId } });
// //     const basketDevices = await BasketDevice.findAll({ where: { basketId: basket.id }, include: ['device'] });
    
// //     return res.json(basketDevices);
// // });

// router.post('/', basketController.addToBasket);  // Добавить товар в корзину
// router.get('/:userId', basketController.getUserBasket);  // Получить все товары в корзине пользователя

// module.exports = router;


const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');


// Добавить товар в корзину
router.post('/', basketController.addToBasket);

// Получить все товары в корзине пользователя
router.get('/:userId', basketController.getUserBasket);



router.put('/:userId', basketController.updateBasket);
router.delete('/:userId', basketController.removeFromBasket);


module.exports = router;

// // Обновить количество товара в корзине
// router.put('/items/:id', basketController.updateBasketItemQuantity);

// // Удалить товар из корзины
// router.delete('/items/:id', basketController.removeBasketItem);
