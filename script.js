/**
 * MiniMe Boutique - Interactive Scripts
 * Handles: Lucide Icons, Product Modal Logic, and Animations
 */

// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Product Database
const productData = {
    ellery: {
        title: "Ellery Family Set",
        price: "₱1,180",
        color: "TEXTURED YELLOW",
        img: "https://www.patpat.com/cdn/shop/files/69661443b8bb1.webp?v=1769507968",
        fallback: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",
        details: ["Premium Mom Dress", "Matching Dad Shirt", "Matching Son Shorts"]
    },
    krizzel: {
        title: "Krizzel Family Set",
        price: "₱1,160",
        color: "OLD ROSE LINEN",
        img: "https://www.patpat.com/cdn/shop/files/8f0d555787d94e459682db9125192dc9.webp?v=1755141353&width=750",
        fallback: "https://images.unsplash.com/photo-1522771917714-d73b5ed5a22d?q=80&w=800",
        details: ["Signature Mom Gown", "Coordinated Dad Polo", "Kids Set (1-9y)"]
    },
    mia: {
        title: "Mia Family Set",
        price: "₱1,140",
        color: "SOFT KHAKI",
        img: "https://www.patpat.com/cdn/shop/files/695ba13b65ece.webp?v=1769075256",
        fallback: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800",
        details: ["Lace Detailed Mom", "Tailored Dad Fit", "Matching Mini Me"]
    }
};

// 3. DOM Elements
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');

// 4. Modal Functions
function openModal(productId) {
    const data = productData[productId];
    if (!data) return;

    // Populate Modal Content
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-price').innerText = data.price;
    document.getElementById('modal-color').innerText = data.color;
    
    const modalImg = document.getElementById('modal-product-img');
    modalImg.src = data.img;
    modalImg.onerror = () => { modalImg.src = data.fallback; };
    
    // Generate Bundle List
    const list = document.getElementById('modal-details');
    list.innerHTML = data.details.map(detail => `
        <li class="flex items-center text-[12px] text-stone-900 font-bold tracking-tight uppercase">
            <span class="w-2.5 h-2.5 rounded-full bg-[#D98A5F] mr-5 shadow-sm"></span>${detail}
        </li>
    `).join('');

    // Show Modal with Animation
    productModal.classList.remove('modal-hidden');
    setTimeout(() => {
        modalContent.classList.add('opacity-100', 'scale-100');
        modalContent.classList.remove('scale-95');
    }, 50);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    modalContent.classList.remove('opacity-100', 'scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        productModal.classList.add('modal-hidden');
    }, 500);
    
    // Restore scrolling
    document.body.style.overflow = 'auto';
}

// 5. Event Listeners

// Click on Product Card
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-product');
        openModal(id);
    });
});

// Close on 'Esc' Key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
});

// Close on Background Click
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeModals();
});
