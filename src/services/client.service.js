import * as API from '../api/api.js';

export const createClients = async (clientData) => {
    return await API.POST('/api/clients/create-client', clientData);
}

export const getClients = async () => {
    return await API.GET('/api/clients/get-clients');
}

export const getClientById = async (id) => {
    return await API.GET(`/api/clients/get-client/${id}`);
}

export const updateClient = async (id, clientData) => {
    return await API.PUT(`/api/clients/update-client/${id}`, clientData);
}

export const deleteClient = async (id) => {
    return await API.DELETE(`/api/clients/delete-client/${id}`);
}

export const addActivityToClient = async (id, activity) => {
    return await API.PUT(`/api/clients/add-activity-to-client/${id}`, { activity });
}

export const deleteActivityFromClient = async (id, activity) => {
    return await API.PUT(`/api/clients/delete-activity-from-client/${id}`, { activity });
}

export const getClientNameAndId = async () => {
    return await API.GET('/api/clients/get-client-name-and-id');
}