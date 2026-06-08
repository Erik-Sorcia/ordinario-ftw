const parametros = new URLSearchParams(window.location.search);
const nombreProducto = parametros.get('nombre');

fetch('datos.xml')
    .then(respuesta => respuesta.text())
    .then(datosTexto => {
        const analizador = new DOMParser();
        const xml = analizador.parseFromString(datosTexto, 'text/xml');
        const motos = xml.getElementsByTagName('moto');

        let motoData = null;

        for (let moto of motos) {
            const marca = moto.getElementsByTagName('marca')[0].textContent;
            const modelo = moto.getElementsByTagName('modelo')[0].textContent;
            if ((marca + ' ' + modelo) === nombreProducto) {
                motoData = {
                    nombre: marca + ' ' + modelo,
                    precio: moto.getElementsByTagName('precio')[0].textContent,
                    tipo: moto.getElementsByTagName('tipo')[0].textContent,
                    cilindrada: moto.getElementsByTagName('cilindrada')[0].textContent,
                    motor: moto.getElementsByTagName('motor')[0].textContent,
                    frenos: moto.getElementsByTagName('frenos')[0].textContent,
                    tanque: moto.getElementsByTagName('tanque')[0].textContent,
                    imagen: moto.getElementsByTagName('imagen')[0].textContent
                };
                break;
            }
        }

        if (motoData) {
            document.getElementById('moto-nombre').textContent = motoData.nombre;
            document.getElementById('moto-imagen').src = 'img/' + motoData.imagen;
            document.getElementById('moto-imagen').alt = motoData.nombre;
            document.getElementById('moto-precio').textContent = '$' + parseFloat(motoData.precio).toLocaleString('es-MX');

            const contenedorFicha = document.getElementById('ficha-tecnica-contenedor');
            contenedorFicha.innerHTML = `
                <div class="linea-especificacion"><strong class="llave-ficha">Segmento:</strong> ${motoData.tipo}</div>
                <div class="linea-especificacion"><strong class="llave-ficha">Motor:</strong> ${motoData.motor}</div>
                <div class="linea-especificacion"><strong class="llave-ficha">Cilindrada:</strong> ${motoData.cilindrada}</div>
                <div class="linea-especificacion"><strong class="llave-ficha">Frenos:</strong> ${motoData.frenos}</div>
                <div class="linea-especificacion"><strong class="llave-ficha">Tanque de Combustible:</strong> ${motoData.tanque}</div>
            `;

            document.getElementById('btn-comprar-ficha').onclick = function() {
                location.href = 'compra.html?nombre=' + encodeURIComponent(motoData.nombre);
            };
        }
    });