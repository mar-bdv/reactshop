import { $authHost, $host } from "./index";

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


export const addToBasket = async (userId, deviceId, quantity = 1) => {
    const { data } = await $authHost.post('/api/basket', { userId, deviceId, quantity });
    return data;
};


export const fetchBasket = async (userId, basketId, id) => {
    const { data } = await $host.get(`/api/basket/${userId}`, { userId, basketId } )

    return data;
}

export const updateBasketItem = async (userId, deviceId, quantity) => {
    const { data } = await $authHost.put(`/api/basket/${userId}`, { userId, deviceId, quantity });
    return data;
};

export const removeFromBasket = async (userId, deviceId) => {
    const { data } = await $authHost.delete(`/api/basket/${userId}` , {data: { userId, deviceId }} );
    return data;
};


