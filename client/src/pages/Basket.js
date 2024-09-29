import React, { useState, useEffect, useContext } from 'react';
import { fetchBasket, removeFromBasket, updateBasketItem } from '../http/deviceAPI';
import { Context } from '..';
import { getUserIdFromToken } from '../http/userAPI';

// корзина, настроить


const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);

    // useEffect(() => {
    //     const loadBasket = async () => {
    //         const items = await fetchBasket(userId);
    //         setBasketItems(items);
    //     };

    //     loadBasket();
    // }, [userId]);

    //NEW CODE
    useEffect(() => {
        const loadBasket = async () => {
            const userId = getUserIdFromToken(); // Получаем userId из токена
            if (!userId) {
                console.error('User is not authenticated');
                return;
            }
            const items = await fetchBasket(userId); // передаем правильный userId
            setBasketItems(items);
        };
    
        loadBasket();
    }, []);
    //NEW CODE

    const calculateTotalQuantity = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.quantity * item.device.price, 0).toFixed(2);
    };

    const totalQuantity = calculateTotalQuantity(basketItems);
    const totalPrice = calculateTotalPrice(basketItems);

    //  изначальный код - начало
    // const updateItemQuantity = async (itemId, change) => {
    //     const item = basketItems.find(i => i.id === itemId);
    //     if (!item) return; // Проверяем, существует ли товар в корзине
    
    //     const newQuantity = item.quantity + change;
    
    //     if (newQuantity < 1) {
    //         // Удаление товара по deviceId и userId
    //         await removeFromBasket(26, item.device.id);
    //         setBasketItems(prevItems => prevItems.filter(i => i.id !== itemId));
    //     } else {
    //         // Обновление количества товара по deviceId и userId
    //         await updateBasketItem(26, item.device.id, newQuantity);
    //         setBasketItems(prevItems => 
    //             prevItems.map(i => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
    //         );
    //     }
    // };
    //  изначальный код - конец

    // ДАННЫЙ КОД НЕ БУДЕТ РАБОТАТЬ, ПОТОМУ ЧТО userId is undefined
    const updateItemQuantity = async (itemId, change) => {
        const userId = getUserIdFromToken(); // Получаем userId из токена
        if (!userId) {
            console.error('User is not authenticated');
            return;
        }
    
        const item = basketItems.find(i => i.id === itemId);
        if (!item) return; // Проверяем, существует ли товар в корзине
        
        const newQuantity = item.quantity + change;
    
        if (newQuantity < 1) {
            // Удаление товара по deviceId и userId
            try {
                await removeFromBasket(userId, item.device.id);
                setBasketItems(prevItems => prevItems.filter(i => i.id !== itemId));
            } catch (error) {
                console.error('Failed to remove item from basket:', error);
            }
        } else {
            // Обновление количества товара по deviceId и userId
            try {
                await updateBasketItem(userId, item.device.id, newQuantity);
                setBasketItems(prevItems => 
                    prevItems.map(i => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
                );
            } catch (error) {
                console.error('Failed to update item quantity:', error);
            }
        }
    };
    


    return (
        <div className='basket_main'>
            <div className='basket-head__div'>
                <h2 className='basket-heading'>Всего товаров: {totalQuantity}</h2>
                <h2 className='basket-head__price'>Сумма:  { Math.round(totalPrice).toLocaleString('ru-RU')}₽</h2>
            </div>
            
            {basketItems.length > 0 ? (
                <>
                    {basketItems.map(item => (
                        <div className='basket-div' key={item.id}>
                            <img className='basket-img' src={process.env.REACT_APP_API_URL + item.device.img} alt="" />
                            <div className="basket-name_btns">
                                <p className='basket-name'>{item.device.name}</p>
                                <div className='basket-btns_quantity'>
                                    <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>
                        
                            {/* <p className='basket-quantity-price'>{item.device.price.toLocaleString('ru-RU')}₽</p> */}
                        
                            <p className='basket-quantity-price'>
                                {(item.quantity * item.device.price).toLocaleString('ru-RU')}₽
                            </p>
                        </div>
                    ))}
                    <button className='basket-order'>оформить заказ</button>

                </>
                
            ) : (
                <p className='basket_empty-text'>Корзина пуста</p>
            )}
        </div>
    );
};


export default Basket;