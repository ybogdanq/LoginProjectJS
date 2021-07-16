import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import UI from './config/ui.config';
import { validate } from './helpers/validate'
import { showInputError } from './views/form';
import { login , singUp } from './services/auth.service'
import { notify } from './views/notifications';
import { getNews } from './services/news.service';
import { getCountries , getCitiesByCountry} from './helpers/terrain';


const {loginForm,signupForm, inputEmail, inputPassword, citiesInput, countryInput, cities} = UI;
const inputs = [inputEmail, inputPassword];
let selectedCountry;
// Events 
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit()
})
signupForm.addEventListener('submit', e => {
    e.preventDefault(); 
    const user = getSignUpInputsValue(signupForm)
    const formInputs = getSingUpInputs(signupForm)
        
    
    // console.log(user);
    onSignUpSubmit(user, formInputs)
})
countryInput.addEventListener('focusout', () => {
    selectedCountry = countryInput.value;
    
    
    let selectedCountryId = getCountries()
        .then(res => {
            return Object.keys(res).find(
                item => {
                    
                    return res[item] === selectedCountry;
                }
            )
        })
        .then(res => getCitiesByCountry(res))
        .then(res => console.log(res))
        .catch(err => console.log(err));
  
})


function getSingUpInputs(signUpForm){
    const email = signUpForm.querySelector('#email')
    const password = signUpForm.querySelector('#password')
    const nickname = signUpForm.querySelector('#nickname')
    const firstName = signUpForm.querySelector('#firstName')
    const lastName = signUpForm.querySelector('#lastName')
    const phone = signUpForm.querySelector('#phone')
    const gender = signUpForm.querySelector('#gender')
    const city = signUpForm.querySelector('#city')
    const country = signUpForm.querySelector('#country')

    return [email,password,nickname,firstName,lastName,phone,gender,city,country]
}

function getSignUpInputsValue(signUpForm){
    const email = signUpForm.querySelector('#email')
    const password = signUpForm.querySelector('#password')
    const nickname = signUpForm.querySelector('#nickname')
    const firstName = signUpForm.querySelector('#firstName')
    const lastName = signUpForm.querySelector('#lastName')
    const phone = signUpForm.querySelector('#phone')
    const gender = signUpForm.querySelector('#gender')
    const city = signUpForm.querySelector('#city')
    const country = signUpForm.querySelector('#country')
    

    return {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
        first_name: firstName.value,
        last_name: lastName.value,
        phone: phone.value,
        gender_orientation: gender.value,
        city: city.value,
        country: country.value,
    }
}
// handlers

async function onSignUpSubmit(user, formInputs){
    
    const isValidForm = formInputs.every((el) => {
        const isValidInput = validate(el);
        
        if(!isValidInput){
            
            showInputError(el);
        }
        return isValidInput;
    });
    
    if(!isValidForm) return
    
    try {
        await singUp(user);

        signUpForm.reset();
        notify({msg: 'SignUp success', className: 'alert-success'})

    } catch (err) {
        
        notify({msg: 'SignUp failed', className: 'alert-danger'})
    }
}

async function onSubmit() {
    const isValidForm = inputs.every((el) => {
        const isValidInput = validate(el);
        if(!isValidInput){
            showInputError(el);
        }
        return isValidInput;
    });

    if(!isValidForm) return
    
    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();

        loginForm.reset();
        
        // sowing notifies
        notify({msg: 'Login success', className: 'alert-success'})

    } catch (err) {
        // sowing err notifies
        notify({msg: 'Login failed', className: 'alert-danger'})
    }

    
}   
