

export const checkInputs = () => {
    let lastname = document.getElementById('lastName')
    let firstname = document.getElementById('firstName')
    let adresse = document.getElementById('adresse')
    let city = document.getElementById('city')
    let email = document.getElementById('email')

    let firstNameValue = firstname.value.trim()
    let lastNameValue = lastname.value.trim()
    let adresseValue = adresse.value.trim()
    let cityValue = city.value.trim()
    let emailValue = email.value.trim()

    let isError = true

    if(firstNameValue === '' || null) {
        setError(firstname, 'Saisissez votre prenom')
        isError = false
    } else {
        setSuccess(firstname)
    }
    if(lastNameValue === '' || null) {
        setError(lastname, 'Saisissez votre nom')
        isError = false
    } else {
        setSuccess(lastname )
    }
    if(adresseValue === '' || null) {
        setError(adresse, 'Saisissez votre adresse')
        isError = false
    } else {
        setSuccess(adresse )
    }
    if(cityValue === '' || null) {
        setError(city, 'Saisissez votre ville')
        isError = false
    } else {
        setSuccess(city )
    }
    if(emailValue === '' || null) {
        setError(email, 'Saisissez votre email')
        isError = false
    } else if (!isEmail(emailValue)){
        setError(email, 'Entrez un email valide')
        isError = false
    } else {
        setSuccess(email)
    }
     return isError
    

}
const isEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)


const setError = (input, message) => {
    const inputContainer = input.parentElement;
    const errorMessage = inputContainer.querySelector('small')
    errorMessage.textContent = message
    inputContainer.className = 'form__inputContainer error'
}
const setSuccess = (input) => {
    const inputContainer = input.parentElement;
    inputContainer.className = 'form__inputContainer success'
}