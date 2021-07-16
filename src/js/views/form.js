/**
 * 
 * @param {String} msg 
 */

function inputErrorTemplate(msg){
    return `
        <div class="invalid-feedback">${msg}</div>
    `
}

/**
 * 
 * Function showInputError, Add input error
 * @param {HTMLInputEl} el 
 */
export function showInputError(el) {
    const parent = el.parentElement;
    const msg = el.dataset.invalidMessage || 'Invalid input';
    const template = inputErrorTemplate(msg);
    el.classList.add('is-invalid');
    if (el.nextElementSibling) {
        el.nextElementSibling.remove();
    }
    parent.insertAdjacentHTML('beforeend', template)
}

