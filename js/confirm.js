if(localStorage.getItem('orderId') && localStorage.getItem('orderPrice')) {
    let orderId = localStorage.getItem('orderId')
    let orderPrice = localStorage.getItem('orderPrice')
    console.log(orderPrice);
    document.querySelector(".order h1 span").textContent = orderId
    document.querySelector(".order p span").textContent = `${orderPrice} €`
    localStorage.clear() 
} else {
    window.location.assign('../index.html')
}