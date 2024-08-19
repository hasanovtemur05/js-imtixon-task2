const productList = document.getElementById('product-list');
const pagination = document.getElementById('pagination');

const items_per_page = 4; 
let currentPage = 1;

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                </a>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function Pagination(totalProducts) {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalProducts / items_per_page);
    for (let i = 1; i <= totalPages; i++) {
        const page_btn = document.createElement('button');
        page_btn.innerText = i;
        page_btn.classList.add('pagination-btn');
        if (i === currentPage) {
            page_btn.classList.add('active');
        }
        page_btn.addEventListener('click', () => {
            currentPage = i;
            loadProducts();
        });
        pagination.appendChild(page_btn);
    }
}

function loadProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const start = (currentPage - 1) * items_per_page;
            const end = start + items_per_page;
            renderProducts(products.slice(start, end));
            Pagination(products.length);
        })
        .catch(error => console.error('Error:', error));
}

loadProducts();
