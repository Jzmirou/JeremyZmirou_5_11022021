import { getCamera, sendPost } from './api.js'
import { checkPanier, panier, checkPriceTotal, removePanier } from './panier.js'
import { checkInputs } from './checkInput.js'

let panier__price = document.getElementById('panier__price')
let panier__priceTotal = panier__price.querySelector('p')
let main__panier = document.getElementById('panier')
let panier__button = document.getElementById('panier--button')
let confirm__button = document.getElementById('form--button')
let form = document.getElementById('form__confirm')
let cards = document.getElementById('panier__cards')

const createCardPanier = (camera) => {
    
    let card = document.createElement('div')
    let imgContainer = document.createElement('div')
    let img = document.createElement('img')
    let cardContent = document.createElement('div')
    let name = document.createElement('p')
    let del = document.createElement('button')
    let iconDel = document.createElement('i')
    let price = document.createElement('p')
    imgContainer.appendChild(img)
    cards.appendChild(card)
    card.appendChild(imgContainer)
    card.appendChild(cardContent)
    cardContent.appendChild(del)
    cardContent.appendChild(name)
    cardContent.appendChild(price)
    del.appendChild(iconDel)
    del.onclick = () => {
        
        card.remove()
        console.log(camera._id);
        removePanier(camera._id)
        checkPriceTotal(panier).then( price => {
            panier__priceTotal.innerText = price + ' €'
        })
        
    }
    del.classList.add('panier__card--del')
    card.classList.add('panier__card')
    imgContainer.classList.add('panier__card--imgContainer')
    img.src = camera.imageUrl
    img.classList.add('panier__card--img')
    cardContent.classList.add('panier__card--content')
    iconDel.className = 'fas fa-times'
    name.textContent = camera.name
    name.classList.add('panier__card--name')
    price.textContent = camera.price + ' €'
    price.classList.add('panier__card--price')

}
const displayPanier = () => {
    if(panier.length > 0) {
        panier.map(cameraPanier => {
        getCamera(cameraPanier).then(camera => {
            createCardPanier(camera)
        })
    })
    } else {
        panier__button.style.visibility = 'hidden'
        panier__price.style.visibility = 'hidden'

        cards.textContent = 'Panier vide'

    }
    
}

const displayConfirmForm = () => {
    if(panier.length > 0) {
        main__panier.style.display = 'none'
    form.style.display = 'grid'
    panier__button.style.display = 'none'
    confirm__button.style.display = 'block'
    }
    
}

const confirmCommand = (event) => {
    event.preventDefault()
    checkInputs()
    if (checkInputs()) {
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
        let data = {
            contact: {
                firstName: firstNameValue,
                lastName: lastNameValue,
                address: adresseValue,
                city: cityValue,
                email: emailValue
            },
            products: panier

        }
        console.log('good');
        sendPost(data).then(data => {
            console.log(data);
            let order = []
            data.products.map(product => {
                order.push(product._id)
            })
            checkPriceTotal(order).then(price => {
                localStorage.setItem('orderPrice', JSON.stringify(price))
                console.log(localStorage.getItem('orderPrice'))
                localStorage.setItem('orderId', data.orderId)
                console.log(localStorage.getItem('orderId'));
                localStorage.removeItem('panier')
                window.location.assign('../page/confirm.html')
            })



        })

    }

}

checkPanier()
displayPanier()


checkPriceTotal(panier).then(price => {
    panier__priceTotal.innerText = price + ' €'
})

form.addEventListener('submit', confirmCommand)
panier__button.onclick = () => displayConfirmForm()



