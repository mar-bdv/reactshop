import {$authHost, $host} from "./index";
// import jwt_decode from "jwt-decode";

// настроены эндпоинты и методы get - post для типов, брэндов, товаров, и одного товара, также здесь можно определить лимит отображения товаров на странице


export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand', )

    return data
}

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 8) => {
    const { data } = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

// export const addToBasket = async (userId, deviceId, quantity = 1) => {
    
//     const { data } = await $authHost.post('/api/basket', { userId });
    

//     return data;
//     //await axios.post('/api/basket', { userId, deviceId });
// }

export const addToBasket = async (userId, deviceId, quantity = 1) => {
    const { data } = await $authHost.post('/api/basket', { userId, deviceId, quantity });
    return data;
};


export const fetchBasket = async (userId, basketId, id) => {
    console.log("fetch userId", userId)
    console.log("fetch basketId", basketId)
    console.log("fetch id", id)
    const { data } = await $host.get(`/api/basket/${userId}`, { userId, basketId } ) // реализовать возможность просмотра корзины для всех пользователей! поменять на userId

    console.log("fetch basket -", data)

    //const response = await axios.get(`/api/basket/${userId}`);
    return data;
}

export const updateBasketItem = async (userId, deviceId, quantity) => {
    console.log("deviceApi")
    console.log("userId - ", userId)
    console.log("deviceId - ", deviceId)
    console.log("quantity - ", quantity)

    const { data } = await $authHost.put(`/api/basket/${userId}`, { userId, deviceId, quantity });
    return data;
};

export const removeFromBasket = async (userId, deviceId) => {
    console.log("deviceApi")
    console.log("userId - ", userId)
    console.log("deviceId - ", deviceId)
    //console.log("basketId - ", basketId)

    const { data } = await $authHost.delete(`/api/basket/${userId}` , {data: { userId, deviceId }} );
    console.log("deviceApi 2", userId, deviceId, )
    return data;
};



// export const fetchBasket = async (userId) => {
//     if (!userId) {
//         console.error("User ID is undefined");
//         return;
//     }

//     const { data } = await $host.get(`/api/basket/26`);
//     return data;
// }