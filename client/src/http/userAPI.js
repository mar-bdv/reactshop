import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode';  

export const registration = async (email, password, role) => {
    const { data } = await $host.post('api/user/registration', {email, password, role: "USER"});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token); 
}

export const login = async (email, password, role) => {
    const { data } = await $host.post('api/user/login', {email, password, role});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);  
}

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.id; 
    }
    return null;
};

export const check = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Токен отсутствует, пользователь не авторизован");
        return null; 
    }
    
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
