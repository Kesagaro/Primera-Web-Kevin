// Galería de bandas: se arma a partir de bandas.json y se filtra por género
const galeria = document.getElementById('galeria');
const filtros = document.querySelectorAll('.filter');

function crearTarjeta(banda) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'cont-work';
    tarjeta.dataset.genero = banda.genero;

    const marco = document.createElement('div');
    marco.className = 'img-work';
    const foto = document.createElement('img');
    foto.src = banda.imagen;
    foto.alt = banda.alt;
    foto.width = banda.ancho;
    foto.height = banda.alto;
    foto.loading = 'lazy';
    foto.decoding = 'async';
    marco.appendChild(foto);

    const textos = document.createElement('div');
    textos.className = 'textos-work';
    const nombre = document.createElement('h3');
    nombre.textContent = banda.nombre;
    textos.appendChild(nombre);

    tarjeta.append(marco, textos);
    return tarjeta;
}

function filtrar(genero) {
    galeria.querySelectorAll('.cont-work').forEach(function (tarjeta) {
        tarjeta.hidden = genero !== 'todos' && tarjeta.dataset.genero !== genero;
    });
}

filtros.forEach(function (boton) {
    boton.addEventListener('click', function () {
        filtros.forEach(function (otro) {
            otro.classList.remove('active');
            otro.setAttribute('aria-pressed', 'false');
        });
        boton.classList.add('active');
        boton.setAttribute('aria-pressed', 'true');
        filtrar(boton.dataset.nombre);
    });
});

fetch('bandas.json')
    .then(function (respuesta) {
        if (!respuesta.ok) {
            throw new Error('No se pudo leer bandas.json');
        }
        return respuesta.json();
    })
    .then(function (bandas) {
        galeria.replaceChildren(...bandas.map(crearTarjeta));
        // Respeta el filtro si el usuario lo eligió antes de que cargaran las bandas
        filtrar(document.querySelector('.filter.active').dataset.nombre);
    })
    .catch(function () {
        const aviso = document.createElement('p');
        aviso.className = 'aviso-galeria';
        aviso.setAttribute('role', 'alert');
        aviso.textContent = 'No se pudieron cargar las bandas. Intenta recargar la página.';
        galeria.replaceChildren(aviso);
    });
