import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode';  // Изменение здесь

// здесь настроена регистрация, авторизация и также выдача токена

export const registration = async (email, password, role) => {
    const { data } = await $host.post('api/user/registration', {email, password, role: "USER"}) // РОЛЬ ЮЗЕР ИЛИ АДМИН
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token); 
}

export const login = async (email, password, role) => {
    const { data } = await $host.post('api/user/login', {email, password, role})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);  
}

// export const check = async () => {
//     const { data } = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token);  
// }

export const check = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Если токена нет, возвращаем ошибку или просто ничего не делаем
        console.error("Токен отсутствует, пользователь не авторизован");
        return null; // или верни ошибку
    }

    // Если токен есть, выполняем запрос
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
