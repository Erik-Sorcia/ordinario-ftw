let listaRefacciones = [];

fetch('datos.xml')
    .then(respuesta => respuesta.text())
    .then(datosTexto => {
        const xml = new DOMParser().parseFromString(datosTexto, 'text/xml');
        const items = xml.getElementsByTagName('refacciones')[0].getElementsByTagName('item');

        for (let item of items) {
            listaRefacciones.push({
                nombre: item.getElementsByTagName('nombre')[0].textContent,
                precio: item.getElementsByTagName('precio')[0].textContent,
                imagen: item.getElementsByTagName('imagen')[0].textContent,
                compatibilidad: item.getElementsByTagName('compatibilidad')[0].textContent
            });
        }

        renderizarRefacciones(listaRefacciones);
        configurarFiltroEnTiempoReal();
    });

function renderizarRefacciones(itemsMostrar) {
    const contenedor = document.getElementById('contenedor-refacciones');
    contenedor.innerHTML = '';

    for (let item of itemsMostrar) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-moto';
        tarjeta.innerHTML = `
            <img src="img/${item.imagen}" alt="${item.nombre}">
            <div class="tarjeta-info">
                <h3>${item.nombre}</h3>
                <p class="texto-tecnico-secundario">Compatible: ${item.compatibilidad}</p>
                <p class="texto-precio-catalogo">$${parseFloat(item.precio).toLocaleString('es-MX')}</p>
                <button onclick="location.href='compra.html?nombre=${encodeURIComponent(item.nombre)}'">Comprar</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    }
}

function configurarFiltroEnTiempoReal() {
    const inputBuscar = document.getElementById('buscar-refaccion-input');

    inputBuscar.addEventListener('input', () => {
        const termino = inputBuscar.value.trim().toLowerCase();

        const resultados = listaRefacciones.filter(r => 
            r.nombre.toLowerCase().includes(termino) || 
            r.compatibilidad.toLowerCase().includes(termino)
        );

        renderizarRefacciones(resultados);
    });
}