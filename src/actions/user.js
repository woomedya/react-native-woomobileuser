import * as pageStore from '../store/page';
import * as userStore from '../store/user';
import * as tempuserStore from '../store/tempuser';
import * as userRepo from '../repositories/user';

export const login = user => {
    userRepo.setUser(user);
    pageStore.clearPage();
    userStore.setUser(user);
    tempuserStore.setUsername('');
}

export const logout = () => {
    userRepo.setUser(null);
    pageStore.clearPage();
    userStore.setUser(null);
}