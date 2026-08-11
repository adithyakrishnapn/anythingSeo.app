import * as API from '../api/api.js';

export const getSettings = async () => {
    return await API.GET('/api/settings');
};

export const updateEmailConfig = async (data) => {
    return await API.PUT('/api/settings/email', data);
};

export const updateAiConfig = async (data) => {
    return await API.PUT('/api/settings/ai', data);
};

export const deleteEmailConfig = async () => {
    return await API.DELETE('/api/settings/email');
};

export const deleteAiConfig = async () => {
    return await API.DELETE('/api/settings/ai');
};
