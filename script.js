let products = [];

// Função para carregar produtos do JSON
async function loadProducts() {
    try {
        const response = await fetch('produtos.json');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

// Função para mostrar os produtos
function displayProducts(productsToShow) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price}</p>
            <a href="${product.affiliateLink}" target="_blank">Comprar</a>
        `;
        container.appendChild(card);
    });
}

// Pesquisa e filtro
document.getElementById('search').addEventListener('input', () => {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    displayProducts(filtered);
});

document.getElementById('priceFilter').addEventListener('change', () => {
    const value = document.getElementById('priceFilter').value;
    let filtered = products;

    if (value !== 'all') {
        filtered = products.filter(p => {
            const price = parseFloat(p.price);
            if (value === '0-50') return price <= 50;
            if (value === '50-100') return price > 50 && price <= 100;
            if (value === '100-200') return price > 100 && price <= 200;
            if (value === '200') return price > 200;
        });
    }

    displayProducts(filtered);
});

// Inicializa
loadProducts();
