const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/', basketController.addToBasket);

router.get('/:userId', basketController.getUserBasket);



router.put('/:userId', basketController.updateBasket);
router.delete('/:userId', basketController.removeFromBasket);


module.exports = router;
