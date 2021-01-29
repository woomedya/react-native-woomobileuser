import opts from './config';
import WUPage from './src/components/WUPage';
import * as langStore from './src/store/language';
import * as userStore_ from './src/store/user';
import * as userRepo from './src/repositories/user';
import WUBackButton_ from './src/components/WUBackButton';
import * as userAction_ from './src/actions/user';

export const config = async ({ serverUrl, publicKey, privateKey, locales, lang, webClientId }) => {
    opts.serverUrl = serverUrl;
    opts.publicKey = publicKey;
    opts.privateKey = privateKey;
    opts.lang = lang;
    opts.locales = locales || {};
    opts.webClientId = webClientId;

    var user = await userRepo.getUser();
    userStore_.setUser(user);

    langStore.setLanguage(lang);
}

export const setLang = (lang) => {
    opts.lang = lang;
    langStore.setLanguage(lang);
}

export default WUPage;

export const WUBackButton = WUBackButton_;

export const userStore = userStore_;

export const userAction = userAction_;