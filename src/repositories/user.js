import judel from 'judel';
import AsyncStorage from '@react-native-community/async-storage';

var adaptor = judel.adaptor.AsyncStorage(AsyncStorage);

const repo = new judel.Repo({
    adaptor
});

const defaultUser = {
    user: null
}

const userModel = repo.create("woomobileuser_user");

var cacheValue = null;

const get = async () => {
    if (cacheValue == null) {
        var list = await userModel.list();
        if (list.length) {
            cacheValue = list[0];
        } else {
            cacheValue = defaultUser;
        }
    }
    return cacheValue;
}

const set = async (key, value) => {
    cacheValue = await get();
    cacheValue[key] = value;
    await userModel.upsert(cacheValue);
}

export const getUser = async () => {
    var value = await get();
    return value.user;
}

export const setUser = async (value) => {
    await set("user", value);
}