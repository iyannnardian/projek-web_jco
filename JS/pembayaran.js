// ===========================================
// KODE JAVASCRIPT UNTUK HALAMAN MENU
// ===========================================
// Tambahkan kode ini di bagian bawah file menu1.html sebelum </body>

// Data produk (sesuaikan dengan produk yang ada di menu Anda)
const products = [
    { id: 1, name: "Iced Coffee", price: 25000, description: "Refreshing cold brew coffee with ice" },
    { id: 2, name: "Cappuccino", price: 30000, description: "Classic Italian coffee with steamed milk" },
    { id: 3, name: "Espresso", price: 20000, description: "Strong and bold coffee shot" },
    { id: 4, name: "Glazed Donut", price: 15000, description: "Classic glazed donut with sweet coating" },
    { id: 5, name: "Chocolate Donut", price: 18000, description: "Rich chocolate donut with premium cocoa" },
    { id: 6, name: "Strawberry Donut", price: 18000, description: "Sweet strawberry glazed donut" }
];

// Fungsi untuk mengubah quantity
function changeQuantity(productId, change) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        let currentQty = parseInt(qtyInput.value);
        currentQty += change;
        if (currentQty < 1) currentQty = 1;
        qtyInput.value = currentQty;
    }
}

// Fungsi untuk update quantity manual
function updateQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput && qtyInput.value < 1) {
        qtyInput.value = 1;
    }
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    // Cari produk berdasarkan ID
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Produk tidak ditemukan!');
        return;
    }

    // Ambil quantity dari input
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

    // Ambil cart dari localStorage
    let cart = JSON.parse(localStorage.getItem('jcoCart') || '[]');

    // Cek apakah produk sudah ada di cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            description: product.description
        });
    }

    // Simpan cart ke localStorage
    localStorage.setItem('jcoCart', JSON.stringify(cart));

    // Show notification
    alert(`${product.name} (${quantity}x) telah ditambahkan ke keranjang!`);

    // Reset quantity input
    if (qtyInput) {
        qtyInput.value = 1;
    }

    // Redirect ke halaman pembayaran
    window.location.href = 'payment.html';
}

// Fungsi untuk menampilkan jumlah item di cart (opsional)
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('jcoCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Jika ada elemen badge di navbar, update jumlahnya
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Jalankan