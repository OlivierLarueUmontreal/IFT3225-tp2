export const emailValidator = async (email) => {
    // see docs: https://docs.abstractapi.com/api/email-reputation
    const url = `https://emailreputation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(data.email_deliverability.status == 'deliverable'){
            return true;
        }
        return false
    } catch(err){
        return true;
    }
}

