let lsTokenKey = 'my_app_token';
// Login: denis.m.pcspace@gmail.com

// Password: dmgame12345
function setToket(req){
    // console.log(req);
    const isAuthURL = req.url.includes('auth');

    if(!isAuthURL){
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token;
    }

    return req
}

function setTokenOnLogin(res){
    const isLoginURL = res.config.url.includes('login')

    if(isLoginURL){
        const token = res.data.token;

        localStorage.setItem(lsTokenKey, token)
    }

    return res
}

function getClearResponse(res){
    return res.data;
}

function onError(err){
    console.dir(err);
    return Promise.reject(err);
}

export default function(axios) {
    axios.interceptors.request.use(setToket)
    axios.interceptors.response.use(setTokenOnLogin)

    // always last
    axios.interceptors.response.use(getClearResponse, onError)
}