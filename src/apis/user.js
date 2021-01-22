import baseRequest from './baserequest';

export const loginForFirebase = async (email, token) => {
    var response = await baseRequest('/mobileuser/firebase', 'mobileuser.firebase', {
        email,
        token
    });

    if (response) {
        return response;
    } else {
        return null;
    }
}

export const login = async (username, password) => {
    var response = await baseRequest('/mobileuser/login', 'mobileuser.login', {
        username,
        password
    });

    if (response) {
        return response;
    } else {
        return null;
    }

    // kullanıcının başarılı giriş yapması
    // return {
    //     id: 1,
    //     email: "woomedya.yusuf@gmail.com",
    //     username: 'JosephUz'
    // };

    // hata oluşması durumu
    // throw new Error('test');

    // kullanıcı bilgileri yanlış girilmiş olması
    // return null;
}

export const token = async (jwt) => {
    var response = await baseRequest('/mobileuser/token', 'mobileuser.token', {
        jwt
    });

    if (response) {
        return response;
    } else {
        return null;
    }
}

export const register = async (email, username, password, token) => {
    var response = await baseRequest('/mobileuser/register', 'mobileuser.register', {
        email,
        username,
        password,
        token
    });

    if (response) {
        return response;
    } else {
        throw new Error('fail');
    }

    // başarılı kayıt işlemi
    // return 'ok';

    // hata oluşması durumu
    // throw new Error('test');

    // eposta kullanılıyor olması
    // return 'mailInUse';

    // username kullanılıyor olması
    // return 'usernameInUse';
}

export const activate = async (username, activationcode) => {
    var response = await baseRequest('/mobileuser/activate', 'mobileuser.activate', {
        username,
        activationcode
    });

    if (response) {
        return response;
    } else {
        return null;
    }

    // kullanıcının başarılı giriş yapması
    // return {
    //     id: 1,
    //     email: "woomedya.yusuf@gmail.com",
    //     username: 'JosephUz'
    // };

    // hata oluşması durumu
    // throw new Error('test');

    // kullanıcı bilgileri yanlış girilmiş olması
    // return null;
}

export const sendActivation = async (email) => {
    var response = await baseRequest('/mobileuser/sendactivation', 'mobileuser.sendactivation', {
        email
    });

    if (response) {
        return response;
    } else {
        return 'fail';
    }

    // başarılı kayıt işlemi
    // return 'ok';

    // hatalı bilgi
    // return 'fail';

    // hata oluşması durumu
    // throw new Error('test');
}



export const sendRecovery = async (email) => {
    var response = await baseRequest('/mobileuser/sendrecovery', 'mobileuser.sendrecovery', {
        email
    });

    if (response) {
        return response;
    } else {
        return 'fail';
    }

    // başarılı kayıt işlemi
    // return 'ok';

    // hatalı bilgi
    // return 'fail';

    // hata oluşması durumu
    // throw new Error('test');
}

export const recovery = async (username, recoverycode, password) => {
    var response = await baseRequest('/mobileuser/recovery', 'mobileuser.recovery', {
        username,
        recoverycode,
        password
    });

    if (response) {
        return response;
    } else {
        return null;
    }

    // kullanıcının başarılı giriş yapması
    // return {
    //     id: 1,
    //     email: "woomedya.yusuf@gmail.com",
    //     username: 'JosephUz'
    // };

    // hata oluşması durumu
    // throw new Error('test');

    // kullanıcı bilgileri yanlış girilmiş olması
    // return null;
}