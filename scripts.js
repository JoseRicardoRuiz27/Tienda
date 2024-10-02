const urlApi = `https://fakestoreapi.com/products`;

    async function getProducts() {
      try {
        // Obtener los productos de la API
        const response = await fetch(urlApi);
        const products = await response.json();

        // Contenedores para productos destacados y categorías
        const featuredContainer = document.getElementById('featuredContainer');
        const mainContainer = document.getElementById('mainContainer');

        featuredContainer.innerHTML = '';
        mainContainer.innerHTML = '';

        // Filtrar productos con rating superior a 4.0
        const featuredProducts = products.filter(product => product.rating.rate > 4.0);

        // Crear contenedor para productos destacados (ruleta de imágenes)
        if (featuredProducts.length > 0) {
          const featuredTitle = document.createElement('h2');
          featuredTitle.classList.add('featured-title');
          featuredTitle.textContent = "Productos Destacados";
          featuredContainer.appendChild(featuredTitle);

          // Crear la estructura del carrusel
          const carouselContainer = document.createElement('div');
          carouselContainer.classList.add('carousel-container');

          const carouselTrack = document.createElement('div');
          carouselTrack.classList.add('carousel-track');

          // Añadir productos al carrusel
          featuredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('carousel-item');

            productDiv.innerHTML = `
              <h2>${product.title}</h2>
              <img src="${product.image}" alt="${product.title}">
              <p>Price: $${product.price}</p>
              <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            `;

            carouselTrack.appendChild(productDiv);
          });

          // Añadir el track y los botones al carrusel
          carouselContainer.appendChild(carouselTrack);

          // Botón para ir hacia atrás
          const prevButton = document.createElement('button');
          prevButton.classList.add('carousel-button', 'prev-button');
          prevButton.textContent = '❮';
          carouselContainer.appendChild(prevButton);

          // Botón para ir hacia adelante
          const nextButton = document.createElement('button');
          nextButton.classList.add('carousel-button', 'next-button');
          nextButton.textContent = '❯';
          carouselContainer.appendChild(nextButton);

          // Agregar el carrusel al contenedor de productos destacados
          featuredContainer.appendChild(carouselContainer);

          // Lógica del carrusel
          let currentIndex = 0;
          const itemWidth = 200 + 32; // Ancho del producto + margen
          const totalItems = featuredProducts.length;

          prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              carouselTrack.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
            }
          });

          nextButton.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
              currentIndex++;
              carouselTrack.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
            }
          });
        }

        // Separar los productos por categorías
        const categories = Array.from(new Set(products.map(product => product.category)));

        // Iterar sobre cada categoría
        categories.forEach(category => {
          const categoryDiv = document.createElement('div');
          categoryDiv.classList.add('category');

          // Crear el título de la categoría
          const categoryTitle = document.createElement('h2');
          categoryTitle.classList.add('category-title');
          categoryTitle.textContent = category;
          categoryDiv.appendChild(categoryTitle);

          // Crear el contenedor de los productos
          const productsContainer = document.createElement('div');
          productsContainer.classList.add('products-container');

          // Filtrar los productos por la categoría actual
          const filteredProducts = products.filter(product => product.category === category);

          // Mostrar los productos dentro del contenedor
          filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('producto');

            productDiv.innerHTML = `
              <h2>${product.title}</h2>
              <img src="${product.image}" alt="${product.title}">
              <p>Price: $${product.price}</p>
              <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            `;

            productsContainer.appendChild(productDiv);
          });

          // Agregar el contenedor de productos a la categoría
          categoryDiv.appendChild(productsContainer);

          // Agregar la categoría completa al contenedor principal
          mainContainer.appendChild(categoryDiv);
        });
      } catch (error) {
        console.log(error);
      }
    }

    // Cargar productos cuando la página se cargue
    window.onload = getProducts;