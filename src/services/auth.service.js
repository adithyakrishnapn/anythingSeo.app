import * as API from '../api/api.js';


export const loginService = async(cred)=>{
    try{
        return await API.POST('/api/auth/login', cred)
    }catch(error){
        console.error('Error logging in:', error);
    }
}

export const registerService = async(cred)=>{
    try{
        return await API.POST('/api/auth/signup', cred)
    }catch(error){
        console.error('Error Signing UP', error);
    }
}


export const currentUser = async()=>{
    try{
        return await API.GET('/api/auth/me');
    }catch(error){
        console.log("Error getting the user", error);
    }
}

export const logoutService = async()=>{
    return await API.POST('/api/auth/logout');
}