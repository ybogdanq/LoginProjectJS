const regExpDic = {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /^[0-9a-zA-Z]{4,}$/,
    nickname: /^[0-9a-zA-Z]{4,}$/,
    firstName: /^[A-Z]+[a-z]{2,}$/,
    lastName: /^[A-Z]+[a-z]{2,}$/,
    phone: /^[0-9+]{2,}$/,
    city:/^[A-Z]+[a-z]{2,}$/,
    country:/^[A-Z]+[a-z]{2,}$/,
};

/**
 * Function validate. check Input on RegEXp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - return true if input valid or if it doesn't have data-reuired attr 
 */

export function validate(el){
    const regExpName = el.dataset.required;
    
    if(!regExpDic[regExpName]) return true
    return regExpDic[regExpName].test(el.value);
}