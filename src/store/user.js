import * as storeUtil from 'jutore';

var store = storeUtil.setScope('woomobileuser_user', {
    user: null
});

export const USER = 'user';

export const setUser = (value) => {
    store.set(USER, value);
}

export const getUser = () => {
    return store.get(USER);
}

export default store;