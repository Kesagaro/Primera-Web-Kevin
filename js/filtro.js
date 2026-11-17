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
    // El botón va dentro del h3; con CSS su área cubre toda la tarjeta
    const nombre = document.createElement('h3');
    const abrirFicha = document.createElement('button');
    abrirFicha.type = 'button';
    abrirFicha.className = 'ver-ficha';
    abrirFicha.textContent = banda.nombre;
    abrirFicha.setAttribute('aria-haspopup', 'dialog');
    abrirFicha.addEventListener('click', function () {
        mostrarFicha(banda);
    });
    nombre.appendChild(abrirFicha);
    textos.appendChild(nombre);

    tarjeta.append(marco, textos);
    return tarjeta;
}

// Ficha de la banda con su video oficial
const ficha = document.getElementById('ficha');
const fichaVideo = ficha.querySelector('.ficha-video');

function mostrarFicha(banda) {
    ficha.querySelector('#ficha-nombre').textContent = banda.nombre;
    ficha.querySelector('.ficha-datos').textContent = banda.pais + ' · Desde ' + banda.formacion;
    ficha.querySelector('.ficha-descripcion').textContent = banda.descripcion;
    ficha.querySelector('.ficha-enlace').href = 'https://www.youtube.com/watch?v=' + banda.video.id;

    // El video se carga solo al abrir la ficha; youtube-nocookie no deja cookies hasta darle play
    const video = document.createElement('iframe');
    video.src = 'https://www.youtube-nocookie.com/embed/' + banda.video.id;
    video.title = banda.nombre + ': ' + banda.video.titulo;
    video.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    video.referrerPolicy = 'strict-origin-when-cross-origin';
    video.allowFullscreen = true;
    fichaVideo.replaceChildren(video);

    ficha.showModal();
}

// Al cerrar se quita el iframe para que el video deje de sonar
ficha.addEventListener('close', function () {
    fichaVideo.replaceChildren();
});

ficha.querySelector('.ficha-cerrar').addEventListener('click', function () {
    ficha.close();
});

// Un clic en el fondo oscuro (fuera del contenido) también cierra la ficha
ficha.addEventListener('click', function (e) {
    if (e.target === ficha) {
        ficha.close();
    }
});

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
