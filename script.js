// دالة لإظهار/إخفاء الشريط الجانبي
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    sidebar.classList.toggle('active');
    menuIcon.classList.toggle('active');
}

// إدارة السلة
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
    saveCartToLocalStorage();
    openCart();
}

function openCart() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    sidebar.classList.add('active');
    menuIcon.classList.add('active');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    // تفريغ السلة قبل التحديث
    if (cartItems) cartItems.innerHTML = '';

    // إضافة العناصر إلى السلة
    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.item} - ${product.price} دينار
            <button onclick="removeFromCart(${index})">إزالة</button>
        `;
        if (cartItems) cartItems.appendChild(li);
    });

    // تحديث الإجمالي
    if (totalElement) totalElement.textContent = total;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
}

// دالة لتفريغ السلة بعد إتمام الطلب
function clearCart() {
    cart = [];
    total = 0;
    updateCart();
    saveCartToLocalStorage();
}

// دالة لإرسال الطلب (وهمية)
function sendEmail(event) {
    event.preventDefault();
    alert('تم إرسال الطلب بنجاح!');
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة! أضف منتجات أولاً.');
    } else {
        window.location.href = 'customer-info.html';
        cart = [];
        total = 0;
        saveCartToLocalStorage();
    }
}

// دالة لتبديل الوضع الداكن
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// تحميل السلة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    updateCart();
});

document.addEventListener('DOMContentLoaded', () => {
    const sizeToggleBtn = document.createElement('button');
    sizeToggleBtn.classList.add('size-toggle');
    sizeToggleBtn.innerHTML = '<i class="fas fa-text-height"></i>';
    document.body.appendChild(sizeToggleBtn);

    sizeToggleBtn.addEventListener('click', () => {
        const currentSize = document.body.classList.contains('size-small') ? 'small' :
                            document.body.classList.contains('size-medium') ? 'medium' : 'large';
        
        if (currentSize === 'small') {
            document.body.classList.remove('size-small');
            document.body.classList.add('size-medium');
        } else if (currentSize === 'medium') {
            document.body.classList.remove('size-medium');
            document.body.classList.add('size-large');
        } else {
            document.body.classList.remove('size-large');
            document.body.classList.add('size-small');
        }
    });
});

// دالة لتفعيل وضع الشاشة الكاملة
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const selectedSize = product.querySelector('.size-btn.active')?.getAttribute('data-size');
        
        if (selectedSize) {
            console.log(`تمت إضافة المنتج بالمقاس: ${selectedSize} إلى السلة`);
        } else {
            alert('الرجاء اختيار مقاس قبل الإضافة إلى السلة');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.circular-navbar .nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);

        // Change icon
        const darkModeIcon = darkModeToggle.querySelector('i');
        if (darkModeIcon) {
            if (isDarkMode) {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
            } else {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
            }
        }
    });

    // Link login to account
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Simulate successful login
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'account.html';
        });
    }

    // Check login status
    if (localStorage.getItem('loggedIn') === 'true') {
        const accountLink = document.querySelector('.circular-navbar .nav-item a[href="account.html"]');
        if (accountLink) {
            accountLink.innerHTML = '<i class="fas fa-user"></i><span>حسابي</span>';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(toggleButton);

    const navbar = document.querySelector('.circular-navbar');
    toggleButton.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function() {
    var isLoggedIn = false; // Replace with actual login check
    if (isLoggedIn) {
        document.getElementById('loginMenuItem').style.display = 'none';
    }

    // Add event listener for theme switcher
    const themeSwitcher = document.querySelector('.theme-switch__checkbox');
    themeSwitcher.addEventListener('change', function() {
        toggleDarkMode();
    });

    // Load dark mode state from localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';
    themeSwitcher.checked = darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
});

function toggleNavbar() {
    var navbar = document.querySelector('.circular-navbar ul');
    navbar.classList.toggle('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// تفعيل الوضع الداكن عند النقر على مفتاح التبديل
document.querySelector('.theme-switch__checkbox').addEventListener('change', function() {
    toggleDarkMode();
});