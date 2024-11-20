let products = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function loadProducts() {
    fetch('https://raw.githubusercontent.com/svillotab/PARCIAL2/refs/heads/main/data.js')
        .then(response => response.text()) 
        .then(data => {
      
            eval(data);
            parseDataToProducts(); 
            renderAllProducts();
            renderFavorites(); 
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}


function parseDataToProducts() {
    products = data.map(item => new Product(item.id, item.name, item.price, item.categories, item.details, item.images));
}


function renderAllProducts() {
    let container = document.getElementById("products");
    container.innerHTML = ""; 
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        container.innerHTML += product.htmlCard(i);
    }
}


function productSelected(pos) {
    let productSelected = products[pos];
    window.location = "./detail.html?name=" + encodeURIComponent(productSelected.name); 
}


function addToFavorites(pos) {
    const product = products[pos];
    

    if (!favorites.some(fav => fav.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites)); 
        renderFavorites();
    } else {
        alert("Este producto ya está en tus favoritos");
    }
}


function removeFromFavorites(pos) {
    favorites.splice(pos, 1); 
    localStorage.setItem('favorites', JSON.stringify(favorites)); 
    renderFavorites(); 
}


function renderFavorites() {
    const favoritosLista = document.getElementById("favoritos-lista");
    favoritosLista.innerHTML = ""; 

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
        favoritosLista.innerHTML += favoriteItem; 
    });
}


window.onload = function() {
    loadProducts(); 
};


function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    renderFilteredProducts(filteredProducts);
}


function renderFilteredProducts(filteredProducts) {
    let container = document.getElementById("products");
    container.innerHTML = "";
    for (let i = 0; i < filteredProducts.length; i++) {
        let product = filteredProducts[i];
        container.innerHTML += product.htmlCard(i);
    }
}


document.getElementById("searchInput").addEventListener("input", searchProducts);


function filterByCategory(category) {
    let filteredProducts;
    if (category) {
        filteredProducts = products.filter(product => 
            product.categories.includes(category)
        );
    } else {
        filteredProducts = products; 
    }
    renderFilteredProducts(filteredProducts);
}


document.getElementById("searchInput").addEventListener("input", searchProducts);


function loadFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
        favorites = storedFavorites;
    }
    renderFavorites(); 
}


window.onload = function() {
    loadProducts(); 
    loadFavorites();
};

function addToFavorites(pos) {
    const product = products[pos];
    

    if (!favorites.some(fav => fav.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites(); 
    } else {
        alert("Este producto ya está en tus favoritos");
    }
}

function renderFavorites() {
    const favoritosLista = document.getElementById("favoritos-lista");
    favoritosLista.innerHTML = "";

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
        favoritosLista.innerHTML += favoriteItem; 
    });
}

function removeFromFavorites(pos) {
    favorites.splice(pos, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites(); 
}