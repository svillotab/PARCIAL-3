class Product {
    constructor(id, name, price, categories, details, images) {
        this.id = id
        this.name = name
        this.price = price
        this.categories = categories
        this.details = details
        this.images = images
    }

    htmlCard(pos) {
        return `
            <div class="product-item" onclick="productSelected(${pos})">
                <img src="${this.images[0]}" alt="">
                <div class="product-item-info">
                    <label>${this.categories}</label>
                    <p>${this.name}</p>
                    <h4>${this.details.size}</h4>
                    <br>
                    <h3>$ ${this.price}</h3>
                    <button onclick="addToFavorites(${pos}); event.stopPropagation();">Agregar a Favoritos</button>
                </div>
            </div>
        `;
    }
}