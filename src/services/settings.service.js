import * as API from '../api/api.js';

export const getSettings = async () => {
    return await API.GET('/settings');
};

export const updateEmailConfig = async (data) => {
    return await API.PUT('/settings/email', data);
};

export const updateAiConfig = async (data) => {
    return await API.PUT('/settings/ai', data);
};

export const deleteEmailConfig = async () => {
    return await API.DELETE('/settings/email');
};

export const deleteAiConfig = async () => {
    return await API.DELETE('/settings/ai');
};
