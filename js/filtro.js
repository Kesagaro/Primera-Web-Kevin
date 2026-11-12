// Filtro de la galería por género
const filtros = document.querySelectorAll('.filter');
const bandas = document.querySelectorAll('.cont-work');

filtros.forEach(function (boton) {
    boton.addEventListener('click', function () {
        filtros.forEach(function (otro) {
            otro.classList.remove('active');
            otro.setAttribute('aria-pressed', 'false');
        });
        boton.classList.add('active');
        boton.setAttribute('aria-pressed', 'true');

        const genero = boton.dataset.nombre;
        bandas.forEach(function (banda) {
            banda.hidden = genero !== 'todos' && !banda.classList.contains(genero);
        });
    });
});
