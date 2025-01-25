// Fungsi untuk memuat menu dari file .txt
function loadMenu() {
    fetch('menu.txt')
        .then(response => response.text())
        .then(data => {
            // Proses data menu.txt
            const lines = data.split('\n');
            const menuList = document.getElementById('menu-list');
            let currentMenuItem = null;
            let currentSubMenu = null;

            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine === '') return; // Skip baris kosong

                const depth = line.search(/\S/); // Menghitung indentasi untuk menentukan kedalaman
                const menuItem = document.createElement('li');

                if (depth === 0) { // Menu utama
                    menuItem.innerHTML = `<a href="#">${trimmedLine}</a>`;
                    menuList.appendChild(menuItem);
                    currentMenuItem = menuItem;
                    currentSubMenu = null;
                } else if (depth === 2) { // Submenu
                    const submenuItem = document.createElement('li');
                    submenuItem.innerHTML = `<a href="#">${trimmedLine}</a>`;
                    currentSubMenu.appendChild(submenuItem);
                } else if (depth === 4) { // Persyaratan
                    const persyaratanItem = document.createElement('li');
                    persyaratanItem.innerHTML = `<span>${trimmedLine}</span>`;
                    currentSubMenu.appendChild(persyaratanItem);
                }

                if (depth === 0 && !currentSubMenu) {
                    // Menambahkan submenu jika belum ada
                    currentSubMenu = document.createElement('ul');
                    currentMenuItem.appendChild(currentSubMenu);
                }
            });
        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
}

// Memanggil fungsi untuk memuat menu setelah halaman dimuat
document.addEventListener('DOMContentLoaded', loadMenu);

// Menambahkan event listener untuk toggle submenu
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.tagName === 'A') {
        const submenu = target.nextElementSibling;
        if (submenu && submenu.tagName === 'UL') {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
    }
});
