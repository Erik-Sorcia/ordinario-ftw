let listaMotos = [];

fetch('datos.xml')
    .then(respuesta => respuesta.text())
    .then(datosTexto => {
        const analizador = new DOMParser();
        const xml = analizador.parseFromString(datosTexto, 'text/xml');
        const motosXml = xml.getElementsByTagName('moto');

        for (let moto of motosXml) {
            listaMotos.push({
                marca: moto.getElementsByTagName('marca')[0].textContent,
                modelo: moto.getElementsByTagName('modelo')[0].textContent,
                tipo: moto.getElementsByTagName('tipo')[0].textContent,
                precio: moto.getElementsByTagName('precio')[0].textContent,
                cilindrada: moto.getElementsByTagName('cilindrada')[0].textContent,
                imagen: moto.getElementsByTagName('imagen')[0].textContent
            });
        }

        const parametros = new URLSearchParams(window.location.search);
        const marcaUrl = parametros.get('marca');
        if (marcaUrl) {
            filtrarPorMarca(marcaUrl);
            actualizarBotonActivo(marcaUrl);
        } else {
            renderizarMotos(listaMotos);
        }

        configurarBotonesFiltro();
    });

function renderizarMotos(motosMostrar) {
    const contenedor = document.getElementById('contenedor-catalogo');
    contenedor.innerHTML = '';

    for (let moto of motosMostrar) {
        const nombreCompleto = moto.marca + ' ' + moto.modelo;
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-moto';
        tarjeta.innerHTML = `
            <img src="img/${moto.imagen}" alt="${nombreCompleto}">
            <div class="tarjeta-info">
                <h3>${nombreCompleto}</h3>
                <p class="texto-tecnico-secundario">Cilindrada: ${moto.cilindrada} | ${moto.tipo}</p>
                <p class="texto-precio-catalogo">$${parseFloat(moto.precio).toLocaleString('es-MX')}</p>
                <button onclick="location.href='detalles.html?nombre=${encodeURIComponent(nombreCompleto)}'">Ver Detalles</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    }
}

function filtrarPorMarca(marca) {
    if (marca === 'Todos') {
        renderizarMotos(listaMotos);
    } else {
        const filtradas = listaMotos.filter(m => m.marca.toLowerCase() === marca.toLowerCase());
        renderizarMotos(filtradas);
    }
}

function configurarBotonesFiltro() {
    const botones = document.querySelectorAll('.botones-filtros button');
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            botones.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            filtrarPorMarca(btn.textContent);
        });
    });
}

function actualizarBotonActivo(marcaActiva) {
    const botones = document.querySelectorAll('.botones-filtros button');
    botones.forEach(btn => {
        if (btn.textContent.toLowerCase() === marcaActiva.toLowerCase()) {
            btn.classList.add('activo');
        } else {
            btn.classList.remove('activo');
        }
    });
}