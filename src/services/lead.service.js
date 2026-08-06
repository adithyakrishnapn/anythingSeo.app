import * as API from '../api/api.js';


export const createLeads = async (leadData) => {
    const response = await API.POST('/leads/create', leadData);
    console.log('Lead created successfully:', response);
    return response;
}

export const getLeads = async () => {
    const response = await API.GET('/leads/getleads');
    return response;
}

export const getLeadById = async (id) => {
    const response = await API.GET(`/leads/getlead/${id}`);
    return response;
}

export const updateLead = async (id, leadData) => {
    const response = await API.PUT(`/leads/update/${id}`, leadData);
    return response;
}

export const deleteLead = async (id) => {
    const response = await API.DELETE(`/leads/delete/${id}`);
    return response;
}

export const convertLeadToCustomer = async (id) => {
    const response = await API.PUT(`/leads/convert-to-customer/${id}`);
    return response;
}

export const addActivity = async (id, activity) => {
    const response = await API.PUT(`/leads/add-activity/${id}`, { activity });
    return response;
}

export const deleteActivity = async (id, activity) => {
    const response = await API.PUT(`/leads/delete-activity/${id}`, { activity });
    return response;
}

export const getPriorities = async () => {
    const response = await API.GET('/leads/priorities');
    return response;
}




////AI LEAD ANALYSIS

export const getLeadAnalysis = async (id) => {
    const response = await API.GET(`/leads/analysis/${id}`);
    return response;
}

export const generateLeadAnalysis = async (id) => {
    const response = await API.POST(`/leads/generate-analysis/${id}`);
    return response;
}
