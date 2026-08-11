import api from './axios';

export const GET = async(url, config = {})=>{
    try{
        const response = await api.get(url, config);
        return response.data;
    }catch(error){
        console.error('GET request error:', error);
        throw error;
    }
}

export const POST = async(url, data = {}, config = {})=>{
    try{
        const response = await api.post(url, data, config);
        return response.data;
    }catch(error){
        console.error('POST request error:', error);
        throw error;
    }
}


export const PUT = async(url, data = {}, config = {})=>{
    try{
        const response = await api.put(url, data, config);
        return response.data;
    }catch(error){
        console.error('PUT request error:', error);
        throw error;
    }
}

export const PATCH = async(url, data = {}, config = {})=>{
    try{
        const response = await api.patch(url, data, config);
        return response.data;
    }catch(error){
        console.error('PATCH request error:', error);
        throw error;
    }
}

export const DELETE = async(url, config = {})=>{
    try{
        const response = await api.delete(url, config);
        return response.data;
    }catch(error){
        console.error('DELETE request error:', error);
        throw error;
    }
}
