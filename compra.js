const parametros = new URLSearchParams(window.location.search);
const productoSeleccionado = parametros.get('nombre');

fetch('datos.xml')
    .then(respuesta => respuesta.text())
    .then(datosTexto => {
        const analizador = new DOMParser();
        const xml = analizador.parseFromString(datosTexto, 'text/xml');
        
        let precio = '';
        let imagen = '';

        const motos = xml.getElementsByTagName('moto');
        for (let moto of motos) {
            const marca = moto.getElementsByTagName('marca')[0].textContent;
            const modelo = moto.getElementsByTagName('modelo')[0].textContent;
            if ((marca + ' ' + modelo) === productoSeleccionado) {
                precio = moto.getElementsByTagName('precio')[0].textContent;
                imagen = moto.getElementsByTagName('imagen')[0].textContent;
                break;
            }
        }

        if (!precio) {
            const items = xml.getElementsByTagName('item');
            for (let item of items) {
                if (item.getElementsByTagName('nombre')[0].textContent === productoSeleccionado) {
                    precio = item.getElementsByTagName('precio')[0].textContent;
                    imagen = item.getElementsByTagName('imagen')[0].textContent;
                    break;
                }
            }
        }

        document.getElementById('checkout-nombre').textContent = productoSeleccionado;
        document.getElementById('checkout-precio').textContent = '$' + parseFloat(precio).toLocaleString('es-MX');
        document.getElementById('checkout-imagen').src = 'img/' + imagen;
        document.getElementById('checkout-imagen').alt = productoSeleccionado;
    });

document.getElementById('formulario-finalizar').addEventListener('submit', function(evento) {
    evento.preventDefault();
    alert('¡Gracias por tu compra!');
    window.location.href = 'index.html';
});