import { getCamera } from './api.js'

let panier = []

const addPanier = (id) => {
    panier.push(id)
    console.log(panier);
    localStorage.setItem('panier', JSON.stringify(panier))
    setPanierBadge()
}
const checkPanier = () => {
    if (localStorage.getItem('panier')) {
        panier = JSON.parse(localStorage.getItem('panier'))
        setPanierBadge()
    } else {
        panier = []
    }
}
const checkPriceTotal = async (data) => {
    let priceTotal = 0
    return Promise.all(data.map(async product => {
        await getCamera(product).then(camera => {
            priceTotal += camera.price
        })
    })).then(() => priceTotal)
}
const removePanier = (id) => {
    let index = panier.indexOf(id)
    console.log(index);
    panier.splice(index, 1)
    console.log(panier);
    if (panier.length <= 0) {
        localStorage.removeItem('panier')
        
    } else {
        localStorage.setItem('panier', JSON.stringify(panier))
        console.log(panier);
        

    }
    setPanierBadge()

    // panier = newPanier
    //localStorage.setItem('panier', JSON.stringify(panier))
}
const setPanierBadge = () => {
    let panierBadge = document.getElementById('header__panier--badge')
    if (panier.length !== 0) {
        panierBadge.style.visibility = 'visible'
        panierBadge.textContent = panier.length
    } else {
        panierBadge.style.visibility = 'hidden'
    }

}


export { panier, addPanier, checkPriceTotal, checkPanier, removePanier }