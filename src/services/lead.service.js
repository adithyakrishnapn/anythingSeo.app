import * as API from '../api/api.js';


export const createLeads = async(leadData)=>{
    try{
        const response = await API.POST('/leads/create', leadData);
        console.log('Lead created successfully:', response);
        return response;
    }catch(error){
        console.error('Error creating leads:', error);
        throw error;
    }
}

export const getLeads = async()=>{
    try{
        const response = await API.GET('/leads/getleads');
        return response;
    }catch(error){
        console.error('Error fetching leads:', error);
        throw error;
    }
}

export const getLeadById = async(id)=>{
    try{
        const response = await API.GET(`/leads/getlead/${id}`);
        return response;
    }catch(error){
        console.error(`Error fetching lead with id ${id}:`, error);
        throw error;
    }
}

export const updateLead = async(id, leadData)=>{
    try{
        const response = await API.PUT(`/leads/update/${id}`, leadData);
        return response;
    }catch(error){
        console.error(`Error updating lead with id ${id}:`, error);
        throw error;
    }
}

export const deleteLead = async(id)=>{
    try{
        const response = await API.DELETE(`/leads/delete/${id}`);
        return response;
    }catch(error){
        console.error(`Error deleting lead with id ${id}:`, error);
        throw error;
    }
}

export const convertLeadToCustomer = async(id)=>{
    try{
        const response = await API.PUT(`/leads/convert-to-customer/${id}`);
        return response;
    }catch(error){
        console.error(`Error converting lead with id ${id} to customer:`, error);
        throw error;
    }
}

export const addActivity = async(id,activity)=>{
    try{
        const response = await API.PUT(`/leads/add-activity/${id}`, { activity });
        return response;
    }catch(error){
        console.error(`Error adding activity to lead with id ${id}:`, error);
        throw error;
    }
}

export const deleteActivity = async(id,activity)=>{
    try{
        const response = await API.PUT(`/leads/delete-activity/${id}`, { activity });
        return response;
    }catch(error){
        console.error(`Error deleting activity from lead with id ${id}:`, error);
        throw error;
    }
}