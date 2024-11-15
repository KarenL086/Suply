document.addEventListener("DOMContentLoaded", function() {
    const productos = [
        {
            "id": "1-p",
            "titulo": "Collar hecho a mano",
            "emprendedor":"Luz de Luna",
            "img_emprendedor": "./multimedia/luna.jpg",
            "imagen": "./multimedia/Collar.jpg",
            "categoria": {
                "nombre": "Joyería",
                "id": "accesorio"
            },
            "precio": 7
        },
        {
            "id": "2-p",
            "titulo": "Abrigo",
            "emprendedor":"Beauty Fashion",
            "img_emprendedor": "./multimedia/abrigo.jpg",
            "imagen": "./multimedia/abrigo.jpg",
            "categoria": {
                "nombre": "Prendas de vestir",
                "id": "ropa"
            },
            "precio": 15
        },
        {
            "id": "3-p",
            "titulo": "Vestido quinceañera",
            "emprendedor":"ChicVibe",
            "img_emprendedor": "./multimedia/logo2.png",
            "imagen": "./multimedia/xv.avif",
            "categoria": {
                "nombre": "Prendas de vestir",
                "id": "ropa"
            },
            "precio": 300
        },
        {
            "id": "4-p",
            "titulo": "Camisa para caballero",
            "emprendedor":"SMan",
            "img_emprendedor": "./multimedia/logo6.jpg",
            "imagen": "./multimedia/camisa.jpg",
            "categoria": {
                "nombre": "Prendas de vestir",
                "id": "ropa"
            },
            "precio": 36
        },
        {
            "id": "5-p",
            "titulo": "Libra de cafe",
            "emprendedor":"FoodExpress",
            "img_emprendedor": "./multimedia/logo3.png",
            "imagen": "./multimedia/cafe.jpg",
            "categoria": {
                "nombre": "Alimentos secos",
                "id": "alimento"
            },
            "precio": 4
        },
        {
            "id": "6-p",
            "titulo": "Jaleas de temporada",
            "emprendedor":"La Cocina de Mary",
            "img_emprendedor": "./multimedia/logo4.jpg",
            "imagen": "./multimedia/jalea.jpg",
            "categoria": {
                "nombre": "Aetesanias",
                "id": "artesania"
            },
            "precio": 1
        },
        {
            "id": "7-p",
            "titulo": "cepillo de dientes de bambú",
            "emprendedor":"Mar",
            "img_emprendedor": "./multimedia/cepillo.jpg",
            "imagen": "./multimedia/cat-limpieza.jpg",
            "categoria": {
                "nombre": "higiene",
                "id": "higiene"
            },
            "precio": 6
        }               
    ];

    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    let productosEnCarrito = []; // Inicializar la variable
    
    function cargarProductos(productosFiltrados) {
        contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de cargar los productos
        productosFiltrados.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("col-auto");
            div.classList.add("m-2");
            div.innerHTML = `
            <div class="producto">
                <a href="producto.html">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="p-3">
                        <h5>${producto.titulo}</h5>
                        <h6>$${producto.precio}</h6>
                        <div class="empre">
                            <div class="img-emprendedor2">
                                <img src="${producto.img_emprendedor}" alt="">
                            </div>
                            <a href="emprendedor.html"><span>${producto.emprendedor}</span></a>
                        </div>
                        <center>
                            <button type="button" class="btn btn-outline-success producto-agregar" id="${producto.id}">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                        </center>
                    </div>
                </a>
            </div>
    
            `;
            contenedorProductos.append(div);
        });
    
        // Event listeners para los botones de agregar al carrito
        document.querySelectorAll('.producto-agregar').forEach(button => {
            button.addEventListener('click', (e) => {
                const productoId = e.currentTarget.id;
                agregarAlCarrito(productoId);
            });
        });
    }
    
    // Cargar todos los productos inicialmente
    cargarProductos(productos);
    
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
    
            let productosBoton;
            if (e.currentTarget.id === "todos") {
                productosBoton = productos;
            } else {
                productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            }
    
            // Limpiar los productos actuales antes de cargar los nuevos
            limpiarProductos();
            cargarProductos(productosBoton);
        });
    });
    
    function limpiarProductos() {
        contenedorProductos.innerHTML = ''; // Eliminar todos los productos actuales
    }
    
    // Función para agregar un producto al carrito
    function agregarAlCarrito(productoId) {
        const producto = productos.find(p => p.id === productoId);
    
        if (!producto) return;
    
        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = productosEnCarrito.find(p => p.id === productoId);
    
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1; // Incrementar la cantidad si ya existe
        } else {
            productosEnCarrito.push({ ...producto, cantidad: 1 }); // Agregar un nuevo producto
        }
    
        // Actualizar el carrito en la vista
        cargarProductosCarrito();
        guardarCarritoEnLocalStorage();
    }
    
    // Guardar el carrito en el localStorage (para que persista)
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    }
    
    // Cargar el carrito desde el localStorage al iniciar
    function cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            productosEnCarrito = carritoGuardado;
        }
        cargarProductosCarrito();
    }
    
    window.onload = function() {
        cargarCarritoDesdeLocalStorage();
    }
    
    function cargarProductosCarrito() {
        const contenedorCarritoProductos = document.getElementById('carrito-productos').querySelector('tbody');
    
        contenedorCarritoProductos.innerHTML = '';
    
        if (productosEnCarrito.length === 0) {
            document.getElementById('carrito-productos').classList.add('disabled');
        } else {
            document.getElementById('carrito-productos').classList.remove('disabled');
        }
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("tr");
            div.innerHTML = `
                <th><img src="${producto.imagen}" alt="${producto.titulo}" class="img_car"></th>
                <td>${producto.titulo}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio}</td>
                <td>$${producto.precio * producto.cantidad}</td>
                <td><button type="button" class="btn btn-outline-danger" id="eliminar-${producto.id}"><i class="bi bi-trash3"></i></button></td>
            `;
    
            div.querySelector(`#eliminar-${producto.id}`).addEventListener('click', () => {
                eliminarProductoDelCarrito(producto.id);
            });
    
            contenedorCarritoProductos.append(div);
        });
    
        actualizarTotalCarrito();
    }
    
    function eliminarProductoDelCarrito(productoId) {
        productosEnCarrito = productosEnCarrito.filter(p => p.id !== productoId);
        cargarProductosCarrito();
        guardarCarritoEnLocalStorage();
    }
    
    function actualizarTotalCarrito() {
        const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        document.getElementById('total-carrito').textContent = `$${total}`;
    }
    
    // Evento para vaciar el carrito
    document.querySelector('.btn-outline-danger').addEventListener('click', () => {
        productosEnCarrito = [];
        cargarProductosCarrito();
        localStorage.removeItem('carrito'); // Limpiar el carrito del localStorage
    });
});
    


