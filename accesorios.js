fetch('datos.xml')
    .then(respuesta => respuesta.text())
    .then(datosTexto => {
        const xml = new DOMParser().parseFromString(datosTexto, 'text/xml');
        const contenedor = document.getElementById('contenedor-accesorios');
        const items = xml.getElementsByTagName('accesorios')[0].getElementsByTagName('item');

        for (let item of items) {
            const nombre = item.getElementsByTagName('nombre')[0].textContent;
            const precio = item.getElementsByTagName('precio')[0].textContent;
            const imagen = item.getElementsByTagName('imagen')[0].textContent;
            const tipo = item.getElementsByTagName('tipo')[0].textContent;

            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-moto';
            tarjeta.innerHTML = `
                <img src="img/${imagen}" alt="${nombre}">
                <div class="tarjeta-info">
                    <h3>${nombre}</h3>
                    <p class="texto-tecnico-secundario">Tipo: ${tipo}</p>
                    <p class="texto-precio-catalogo">$${parseFloat(precio).toLocaleString('es-MX')}</p>
                    <button onclick="location.href='compra.html?nombre=${encodeURIComponent(nombre)}'">Comprar</button>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        }
    });