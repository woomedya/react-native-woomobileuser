import * as storeUtil from 'jutore';

export const PAGE_LOGIN = 'login';
export const PAGE_REGISTER = 'register';
export const PAGE_FORGOT_PASSWORD = 'forgotpassword';
export const PAGE_CHANGE_PASSWORD = 'changepassword';
export const PAGE_RESEND_ACTIVATION = 'resendactivation';
export const PAGE_ACTIVE_ACCOUNT = 'activeaccount';

var store = storeUtil.setScope('woomobileuser_page', {
    page: PAGE_LOGIN
});

var pages = [PAGE_LOGIN];

export const PAGE = 'page';

export const setPage = (value) => {
    if (value) {
        if (pages.indexOf(value) > -1)
            pages = pages.filter((p, i) => i < pages.indexOf(value));

        pages.push(value);
        store.set(PAGE, value);
    }
}

export const backPage = () => {
    if (pages.length > 1) {
        pages.pop();
        var value = pages[pages.length - 1];
        store.set(PAGE, value);
        return value;
    } else {
        return null;
    }
}

export const clearPage = () => {
    pages = [PAGE_LOGIN];
    store.set(PAGE, PAGE_LOGIN);
}

export const getPage = () => {
    return store.get(PAGE);
}

export default store;