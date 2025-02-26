// دالة لإضافة منتج إلى السلة
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`تمت إضافة ${productName} إلى السلة بسعر ${price} دينار`);
}

// دالة لتحميل وعرض المنتجات في السلة
function loadCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    const totalAmount = document.getElementById('total-amount');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>لا يوجد أي منتجات في السلة.</li>';
    } else {
        cartItemsList.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} دينار`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'إزالة';
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
            total += item.price;
        });
        totalAmount.textContent = total;
    }
}

// دالة لإزالة منتج من السلة
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // تحديث عرض السلة بعد الإزالة
}

// دالة لتفريغ السلة بالكامل
function clearCart() {
    localStorage.removeItem('cart');
    loadCartItems(); // تحديث عرض السلة بعد التفريغ
}

// دالة لإنهاء الطلب
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('السلة فارغة! أضف منتجات أولاً.');
    } else {
        window.location.href = 'checkout.html';
    }
}

// دالة لإرسال الطلب (وهمية)
function sendEmail(event) {
    event.preventDefault();
    alert('تم إرسال الطلب بنجاح!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// دالة لتسجيل الدخول
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.name === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        window.location.href = 'account.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
}

// دالة للتسجيل
function register(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name: username, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('تم التسجيل بنجاح! يرجى تسجيل الدخول.');
    window.location.href = 'login.html';
}

// دالة لتسجيل الخروج
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

// دالة لتبديل الوضع الداكن
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// تحميل السلة والوضع الداكن عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل السلة
    if (document.getElementById('cart-items-list')) {
        loadCartItems();
    }

    // تحميل الوضع الداكن
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    // إضافة زر تبديل الوضع الداكن
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', function() {
        toggleDarkMode();
        const darkModeIcon = darkModeToggle.querySelector('i');
        if (darkModeIcon) {
            if (document.body.classList.contains('dark-mode')) {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
            } else {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
            }
        }
    });

    // تحميل بيانات المستخدم في صفحة الحساب
    if (document.getElementById('userName')) {
        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!loggedIn) {
            window.location.href = 'login.html';
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userEmail = localStorage.getItem('userEmail');
            const user = users.find(user => user.email === userEmail);

            if (user) {
                document.getElementById('userName').textContent = user.name;
                document.getElementById('userEmail').textContent = user.email;
                document.getElementById('userPassword').textContent = user.password; // عرض كلمة المرور (غير مشفرة)
            }
        }
    }
});

// دالة لتحميل ملخص الطلب في صفحة إنهاء الطلب
function loadOrderSummary() {
    const orderItemsList = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        orderItemsList.innerHTML = '<li>لا يوجد أي منتجات في السلة.</li>';
    } else {
        orderItemsList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} دينار`;
            orderItemsList.appendChild(li);
            total += item.price;
        });
    }

    orderTotal.textContent = total;
}

// تحميل ملخص الطلب عند فتح صفحة إنهاء الطلب
if (document.getElementById('order-items')) {
    loadOrderSummary();
}

// إدارة التبديل بين تسجيل الدخول والتسجيل
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
});

// دالة لتسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        alert('تم تسجيل الدخول بنجاح!');
        window.location.href = 'account.html'; // توجيه المستخدم إلى صفحة الحساب
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
});

// دالة للتسجيل
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('تم التسجيل بنجاح! يرجى تسجيل الدخول.');
    document.querySelector('.container').classList.remove('active'); // التبديل إلى نموذج تسجيل الدخول
});
