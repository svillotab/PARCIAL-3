const params = new URLSearchParams(window.location.search);
const nameFromUrl = params.get("name");

function getProduct() {
    for (let i = 0; i < data.length; i++) {
        let map = data[i];
        let title = map["name"]; 
        if (title === nameFromUrl) {
            let product = new Product(
                map["id"],
                map["name"],
                map["categories"],
                map["details"],
                map["price"],
                map["images"]
            );
            return product;
        }
    }
}

function renderProduct() {
    let product = getProduct();
    
    if (!product) {
        console.error("Product not found");
        return; 
    }

    let titleH1 = document.getElementById("name");
    titleH1.innerHTML = product.name;

    let priceH3 = document.getElementById("price");
    priceH3.innerHTML = product.price;

    let detailsH2 = document.getElementById("details");
    detailsH2.innerHTML = "$ " + product.details; 

    let images = document.getElementById("images");
    images.src = product.images[0]; 
}

renderProduct();