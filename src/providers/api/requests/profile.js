import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';

export const resetPassword = (old_password,new_password) => doPatch('/resetPassword', { new_password, old_password });
export const updateMyInfo = (data) => doPatch('/my-info', data);