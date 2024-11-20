let products = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Cargar favoritos desde localStorage

// Función para cargar los datos desde la API
function loadProducts() {
    fetch('https://raw.githubusercontent.com/svillotab/PARCIAL2/refs/heads/main/data.js')
        .then(response => response.text()) // Obtener el texto
        .then(data => {
            // Evaluar el texto para convertirlo en un objeto JavaScript
            eval(data); // Esto ejecuta el contenido de data.js como código JavaScript
            parseDataToProducts(); // Llamar a la función para parsear los datos
            renderAllProducts(); // Renderizar todos los productos
            renderFavorites(); // Renderizar la lista de favoritos
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

// Función para parsear los datos a productos
function parseDataToProducts() {
    products = data.map(item => new Product(item.id, item.name, item.price, item.categories, item.details, item.images));
}

// Función para renderizar todos los productos
function renderAllProducts() {
    let container = document.getElementById("products");
    container.innerHTML = ""; // Limpiar el contenedor
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        container.innerHTML += product.htmlCard(i);
    }
}

// Función para manejar la selección de un producto
function productSelected(pos) {
    let productSelected = products[pos];
    window.location = "./detail.html?name=" + encodeURIComponent(productSelected.name); 
}

// Función para agregar un producto a favoritos
function addToFavorites(pos) {
    const product = products[pos];
    
    // Verificar si el producto ya está en favoritos
    if (!favorites.some(fav => fav.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar en localStorage
        renderFavorites(); // Renderizar la lista de favoritos
    } else {
        alert("Este producto ya está en tus favoritos");
    }
}

// Función para eliminar un producto de favoritos
function removeFromFavorites(pos) {
    favorites.splice(pos, 1); // Eliminar el producto de favoritos
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Actualizar localStorage
    renderFavorites(); // Re-renderizar la lista de favoritos
}

// Función para renderizar la lista de favoritos
function renderFavorites() {
    const favoritosLista = document.getElementById("favoritos-lista");
    favoritosLista.innerHTML = ""; // Limpiar la lista de favoritos

    favorites.forEach((product, index) => {
        const favoriteItem = `
            <div class="product-item">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-item-info">
                    <label>${product.categories}</label>
                    <p>${product.name}</p>
                    <h4>${product.details.size}</h4>
                    <br>
                    <h3>$ ${product.price}</h3>
                    <button onclick="removeFromFavorites(${index})">Eliminar</button>
                </div>
            </div>
        `;
        favoritosLista.innerHTML += favoriteItem; // Agregar el elemento a la lista
    });
}

// Cargar los productos al iniciar la página
window.onload = function() {
    loadProducts(); // Cargar los productos desde la API
};

// Función para manejar la búsqueda
function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    renderFilteredProducts(filteredProducts);
}

// Función para renderizar productos filtrados
function renderFilteredProducts(filteredProducts) {
    let container = document.getElementById("products");
    container.innerHTML = ""; // Limpiar el contenedor
    for (let i = 0; i < filteredProducts.length; i++) {
        let product = filteredProducts[i];
        container.innerHTML += product.htmlCard(i);
    }
}

// Agregar evento al campo de búsqueda
document.getElementById("searchInput").addEventListener("input", searchProducts);

// Función para filtrar productos por categoría
function filterByCategory(category) {
    let filteredProducts;
    if (category) {
        filteredProducts = products.filter(product => 
            product.categories.includes(category)
        );
    } else {
        filteredProducts = products; // Si no hay categoría seleccionada, mostrar todos los productos
    }
    renderFilteredProducts(filteredProducts);
}

// Asegúrate de que el evento de búsqueda también esté presente
document.getElementById("searchInput").addEventListener("input", searchProducts);

// Cargar favoritos desde localStorage al iniciar la página
function loadFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
        favorites = storedFavorites;
    }
    renderFavorites(); // Renderizar la lista de favoritos
}

// Llama a loadFavorites al cargar la página
window.onload = function() {
    loadProducts(); // Cargar productos desde la API
    loadFavorites(); // Cargar favoritos desde localStorage
};

function addToFavorites(pos) {
    const product = products[pos];
    
    // Verificar si el producto ya está en favoritos
    if (!favorites.some(fav => fav.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar en localStorage
        renderFavorites(); // Renderizar la lista de favoritos
    } else {
        alert("Este producto ya está en tus favoritos");
    }
}

function renderFavorites() {
    const favoritosLista = document.getElementById("favoritos-lista");
    favoritosLista.innerHTML = ""; // Limpiar la lista de favoritos

    favorites.forEach((product, index) => {
        const favoriteItem = `
            <div class="product-item">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-item-info">
                    <label>${product.categories}</label>
                    <p>${product.name}</p>
                    <h4>${product.details.size}</h4>
                    <br>
                    <h3>$ ${product.price}</h3>
                    <button onclick="removeFromFavorites(${index})">Eliminar</button>
                </div>
            </div>
        `;
        favoritosLista.innerHTML += favoriteItem; // Agregar el elemento a la lista
    });
}

function removeFromFavorites(pos) {
    favorites.splice(pos, 1); // Eliminar el producto de favoritos
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Actualizar localStorage
    renderFavorites(); // Re-renderizar la lista de favoritos
}