import axios from "../plugins/axios";

/**
 * Func makee login request to API
 * @param {String} email 
 * @param {String} password 
 */

export async function login(email, password){
    try {
        const response = await axios.post(`/auth/login`, JSON.stringify({email, password}));

        console.log(response);
        return response.data;

    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export async function singUp({email, password, nickname, first_name, last_name, phone, gender_orientation, city, country}){

    console.log({email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day : +'20', date_of_birth_month: +'03',
    date_of_birth_year: +'1989',});
    try {
        const response = await axios.post('/auth/signup', JSON.stringify({email, password, nickname , first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day : '20', date_of_birth_month: '03',
        date_of_birth_year: '1989',}))
        
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
