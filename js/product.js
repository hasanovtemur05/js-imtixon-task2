const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const Products = document.getElementById('product-detail');
        const productHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h1>${product.title}</h1>
            <p>$${product.price}</p>
            <p>${product.description}</p>
        `;
        Products.innerHTML = productHTML;
    })
    .catch(error => console.error('Error:', error));