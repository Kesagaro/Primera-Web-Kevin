// Animaciones al hacer scroll: los elementos con la clase .revelar aparecen
// suavemente cuando entran en pantalla. Si el sistema pide reducir el
// movimiento, o el navegador no tiene IntersectionObserver, todo se ve quieto.
const animar = !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window;

const observador = animar ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            const elemento = entrada.target;
            elemento.classList.add('visible');
            observador.unobserve(elemento);
            // Al terminar se quitan las clases para que no afecten otros efectos (como el hover de las tarjetas)
            elemento.addEventListener('transitionend', function () {
                elemento.classList.remove('revelar', 'visible');
                elemento.style.removeProperty('--retraso');
            }, { once: true });
        }
    });
}, { rootMargin: '0px 0px -10% 0px' }) : null;

// filtro.js también la usa con las tarjetas que crea a partir de bandas.json
function revelarAlVer(elementos) {
    if (!animar) {
        return;
    }
    elementos.forEach(function (elemento, i) {
        elemento.classList.add('revelar');
        // Las tarjetas de una misma fila aparecen una tras otra
        elemento.style.setProperty('--retraso', (i % 3) * 100 + 'ms');
        observador.observe(elemento);
    });
}

if (animar) {
    document.documentElement.classList.add('animar');
    revelarAlVer(document.querySelectorAll('[data-revelar]'));
}
