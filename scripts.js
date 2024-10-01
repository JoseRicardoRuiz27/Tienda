const urlApi = `https://fakestoreapi.com/products`;

async function getProducts() {
    try {
        // Obtener los productos de la API
        const response = await fetch(urlApi);
        const products = await response.json();

        //tomamos el elemendo del DOM con id productosContainer
        const productosContainer = document.getElementById('productosContainer');

        //limpiamos el contenedor
        productosContainer.innerHTML = '';

        //recorremos los productos y lo mostramos en el DOM
        products.forEach(product => {
            const productDiv = document.createElement('div'); //creamos un nuevo elemento div
            productDiv.classList.add(`producto`) //agregamos la clase producto al elemento

            //estructura del producto en el div
            productDiv.innerHTML = `
            <img src="${product.image}">
            <h2>${product.title}</h2>
            `
            //añadimos el producto al DOM
            productosContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.log(error);
    }
}

//cargamos el producto cuando abrimos la pagina
window.onload = getProducts;