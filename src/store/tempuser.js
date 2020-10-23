import * as storeUtil from 'jutore';

var store = storeUtil.setScope('woomobileuser_user', {
    username: ''
});

export const USERNAME = 'username';

export const setUsername = (value) => {
    store.set(USERNAME, value);
}

export const getUsername = () => {
    return store.get(USERNAME);
}

export default store;