import Crypto from 'woo-crypto';
import { getUTCTime } from 'woo-utilities/date';
import config from '../../config';
import Axios from "axios";

const post = async (baseURL, url, headers, data) => {
    var instance = Axios.create({
        baseURL: baseURL,
        timeout: 10000,
        headers: { 'Content-Type': 'application/json', ...headers }
    });
    var responseJson = await instance.post(url, data);

    return responseJson.data
}

export default baseRequest = async (url, type, obj) => {
    try {
        var token = Crypto.encrypt(JSON.stringify({ expire: getUTCTime(config.tokenTimeout).toString(), type }), config.publicKey, config.privateKey);
        var response = await post(config.serverUrl, url, {
            public: config.publicKey,
            token
        }, {
            ...obj
        });

        if (response && response.status && response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}