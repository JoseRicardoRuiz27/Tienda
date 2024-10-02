const urlApi = `https://fakestoreapi.com/products`;

async function getProducts() {

    try {
        // Obtener los productos de la API
        const response = await fetch(urlApi);
        const products = await response.json();

        // Filtrar productos por categoría
        const menClothing = products.filter(product => product.category === "men's clothing");
        const womenClothing = products.filter(product => product.category === "women's clothing");
        const jewelery = products.filter(product => product.category === "jewelery");
        const electronics = products.filter(product => product.category === "electronics");

        // Mostrar productos filtrados
        displayProductsByCategory(menClothing, 'Men\'s Clothing');
        displayProductsByCategory(womenClothing, 'Women\'s Clothing');
        displayProductsByCategory(jewelery, 'Jewelery');
        displayProductsByCategory(electronics, 'Electronics');
        
    } catch (error) {
        console.log(error);
    }
}

// Función para mostrar productos de cada categoría en el DOM
function displayProductsByCategory(products, category) {
    // Tomamos el elemento del DOM con id productosContainer
    const productosContainer = document.getElementById('productosContainer');

    // Creamos un contenedor para la categoría
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h2>${category}</h2>`;
    
    // Recorremos los productos y los mostramos en el DOM
    products.forEach(product => {
        const productDiv = document.createElement('div'); // Creamos un nuevo elemento div
        productDiv.classList.add('producto'); // Agregamos la clase producto al elemento

        // Estructura del producto en el div
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <img src="${product.image}" alt="${product.title}" style="width: 150px; height: 150px;">
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating.rate} (based on ${product.rating.count} reviews)</p>
        `;
        // Añadimos el producto al contenedor de la categoría
        categoryDiv.appendChild(productDiv);
    });

    // Añadimos el contenedor de la categoría al DOM
    productosContainer.appendChild(categoryDiv);
}

// Cargamos los productos cuando abrimos la página
window.onload = getProducts;
