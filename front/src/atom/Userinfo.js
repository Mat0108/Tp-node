import { atom } from "recoil";

export const UserState = atom({
    key: 'UserState',
    default: {isAdmin:false,isConnected:false,token:""},
});

