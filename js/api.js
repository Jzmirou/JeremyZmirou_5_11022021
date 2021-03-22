export const getCameras = async () => {
    try {
        let response = await fetch('http://localhost:3000/api/cameras')
        if (response.ok) {
            let result = await response.json()
            console.log(result)
            return result
        } else {
            console.error('Le serveur ne répond pas')
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCamera = async (id) => {
    try {       
        let response = await fetch(`http://localhost:3000/api/cameras/${id}`)
        if (response.ok) {
            let result = await response.json()
            return result
        } else {
            console.error('Le serveur ne répond pas')
        }
    } catch (error) {
        console.log(error)
    }
}

export const sendPost = async (data) => {
    let body = JSON.stringify(data)
    try {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }
        console.log(body);
        let response = await fetch('http://localhost:3000/api/cameras/order', config)
        if (response.ok) {
            let result = await response.json()
            return result
        }
    } catch (error) {
        console.error(error);
    }
}