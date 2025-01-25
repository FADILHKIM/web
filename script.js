// Fungsi untuk membaca file .txt dan menampilkan struktur menu
function loadMenu() {
    fetch('menu.txt')  // Gantilah dengan path yang sesuai jika file tidak di root
        .then(response => response.text())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            const menuContent = parseMenu(data);
            menuContainer.innerHTML = menuContent;
            addClickEvents();  // Tambahkan event listener untuk interaksi
        })
        .catch(error => console.error('Error loading menu:', error));
}

// Fungsi untuk mengonversi teks menu menjadi struktur HTML
function parseMenu(menuText) {
    const lines = menuText.split('\n');
    let htmlContent = '';
    let currentIndentation = 0;
    let stack = [];
    
    lines.forEach(line => {
        const indentation = line.search(/\S/);  // Menghitung indentasi (spasi)
        const text = line.trim();
        
        if (text === '') return;  // Skip empty lines

        // Jika indentasi lebih dalam, tambahkan sub-menu
        if (indentation > currentIndentation) {
            const lastItem = stack[stack.length - 1];
            htmlContent += `<ul class="submenu">${lastItem}</ul>`;
            stack.push('');
        } else if (indentation < currentIndentation) {
            stack.pop();
        }
        
        // Menambahkan item menu atau persyaratan
        if (stack.length === 0) {
            htmlContent += `<li class="menu-item">${text}`;
        } else {
            htmlContent += `<li>${text}`;
        }

        currentIndentation = indentation;
    });

    return htmlContent;
}

// Fungsi untuk menambahkan event listener pada klik untuk menampilkan submenu
function addClickEvents() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

// Muat menu ketika halaman dimuat
window.onload = loadMenu;
