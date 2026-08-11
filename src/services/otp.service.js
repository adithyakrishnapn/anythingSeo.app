import * as API from "@/api/api.js";

export const generateOtp = async (email) =>{
    return await API.POST('/api/otp/send-otp', {email});
}
