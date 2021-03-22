import { getCamera } from './api.js'
import {addPanier, checkPanier} from './panier.js'

const url = new URL(window.location.href)
const id = url.searchParams.get('id')

const loadCamDOM = (camera) => {
    let img = document.getElementById('product--img')
    let title = document.getElementById('product--title')
    let description = document.getElementById('product--description')
    let lenses = document.getElementById('product__lenses')
    let price = document.getElementById('product--price')
    let button = document.getElementById('product--button')
    img.src = camera.imageUrl
    title.textContent = camera.name
    description.textContent = camera.description
    price.textContent = camera.price + ' €'
    button.onclick = () => addPanier(id)
    camera.lenses.map((lens, i) => {
        let lense = document.createElement('input')
        let labelLense = document.createElement('label')
        let inputContainer = document.createElement('div')
        inputContainer.classList.add('lense__container')
        inputContainer.appendChild(lense)
        inputContainer.appendChild(labelLense)
        lenses.appendChild(inputContainer)
        lense.type = 'radio'
        lense.name = 'lense'
        lense.id = `${i}`
        labelLense.htmlFor = `${i}`
        labelLense.textContent = lens
    })
}

checkPanier()

getCamera(id).then(result => {
    loadCamDOM(result)
    
})
