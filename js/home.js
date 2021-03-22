import { getCameras } from './api.js'
import {checkPanier} from './panier.js'

const createCardCam = (cameras) => {
    cameras.map(camera => {
        console.log(camera)
        let main = document.getElementById('main')
        let card = document.createElement('article')
        let link = document.createElement('a')
        link.href = `page/product.html?id=${camera._id}`
        main.appendChild(link)
        link.appendChild(card)
        card.classList.add('main__product')
        let cardImg = document.createElement('img')
        cardImg.src = camera.imageUrl
        cardImg.classList.add('main__product--img')
        let cardTitle = document.createElement('h2')
        cardTitle.textContent = camera.name
        let cardPrice = document.createElement('span')
        cardPrice.textContent = camera.price + ' €'
        card.appendChild(cardImg)
        card.appendChild(cardTitle)
        card.appendChild(cardPrice)
    })

}
checkPanier()
getCameras()
    .then(cameras => {
        createCardCam(cameras)
    })

