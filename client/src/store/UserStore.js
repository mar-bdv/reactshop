import { makeAutoObservable } from "mobx";

// роли для юзера

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userRole = {} // ЗДЕСЬ
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setRole(user) {
        this._userRole = user
    }

    get role() {
        return this._userRole;
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}


// import { makeAutoObservable, toJS } from "mobx";

// // роли для юзера

// export default class UserStore {
//     constructor() {
//         this._isAuth = false;
//         this._user = {};
//         this._userRole = {}; // ЗДЕСЬ
//         makeAutoObservable(this);
//     }

//     setIsAuth(bool) {
//         this._isAuth = bool;
//     }
    
//     setUser(user) {
//         this._user = user;
//     }

//     setRole(user) {
//         this._userRole = user;
//     }

//     get role() {
//         // Преобразование роли в обычный объект
//         return toJS(this._userRole);
//     }

//     get isAuth() {
//         return this._isAuth;
//     }

//     get user() {
//         // Преобразование пользователя в обычный объект
//         return toJS(this._user);
//     }
// }

// import { makeAutoObservable, toJS } from "mobx";

// export default class UserStore {
//     constructor() {
//         this._isAuth = false;
//         this._user = {}; 
//         makeAutoObservable(this);
//     }

//     setIsAuth(bool) {
//         this._isAuth = bool;
//     }

//     setUser(user) {
//         this._user = user; 
//     }

//     get role() {
//         return toJS(this._user).role || 'USER';
//     }

//     get isAuth() {
//         return this._isAuth;
//     }

//     get user() {
//         return this._user;
//     }
// }
