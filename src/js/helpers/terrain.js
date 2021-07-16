import axios from "../plugins/axios";

export async function getCountries(){
    try{
        const response = await axios.get('/location/get-countries');


        
        Promise.resolve(response);
        return response
        

    }catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}
export async function getCitiesByCountry(country){
    try{
        const response = await axios.get(`location/get-cities/${country}`);

        
        Promise.resolve(response);
        return response

    }catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}