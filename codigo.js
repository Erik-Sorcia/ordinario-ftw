fetch('datos.xml')
    .then(respuesta => respuesta.text())
    .then(datosTexto => {
        const analizador = new DOMParser();
        const xml = analizador.parseFromString(datosTexto, 'text/xml');
        const contenedor = document.getElementById('motos-destacadas');
        const motos = xml.getElementsByTagName('moto');
        let contador = 0;

        for (let moto of motos) {
            const destacada = moto.getElementsByTagName('destacada')[0].textContent;
            if (destacada === 'si' && contador < 3) {
                const marca = moto.getElementsByTagName('marca')[0].textContent;
                const modelo = moto.getElementsByTagName('modelo')[0].textContent;
                const nombreCompleto = marca + ' ' + modelo;
                const precio = moto.getElementsByTagName('precio')[0].textContent;
                const imagen = moto.getElementsByTagName('imagen')[0].textContent;

                const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta-inicio-premium';
                tarjeta.innerHTML = `
                    <div class="img-contenedor">
                        <img src="img/${imagen}" alt="${nombreCompleto}">
                    </div>
                    <div class="info-premium">
                        <span class="marca-badge">${marca}</span>
                        <h3>${modelo}</h3>
                        <p class="precio-premium">$${parseFloat(precio).toLocaleString('es-MX')}</p>
                        <button class="btn-premium" onclick="location.href='detalles.html?nombre=${encodeURIComponent(nombreCompleto)}'">Ver Ficha Técnica</button>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
                contador++;
            }
        }
    });