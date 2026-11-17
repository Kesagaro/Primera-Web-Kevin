// Modo claro / oscuro. El tema inicial lo pone el script del <head>;
// aquí solo se cambia con el botón y se recuerda la elección.
const botonTema = document.getElementById('tema');
const raiz = document.documentElement;
const sistemaOscuro = window.matchMedia('(prefers-color-scheme: dark)');

function aplicarTema(tema) {
    raiz.dataset.tema = tema;
    botonTema.setAttribute('aria-pressed', tema === 'oscuro' ? 'true' : 'false');
}

function temaGuardado() {
    try {
        return localStorage.getItem('tema');
    } catch (e) {
        return null;
    }
}

aplicarTema(raiz.dataset.tema);

botonTema.addEventListener('click', function () {
    const nuevo = raiz.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
    aplicarTema(nuevo);
    try {
        localStorage.setItem('tema', nuevo);
    } catch (e) {}
});

// Si el usuario nunca eligió, la página sigue el modo del sistema aunque cambie
sistemaOscuro.addEventListener('change', function (e) {
    if (!temaGuardado()) {
        aplicarTema(e.matches ? 'oscuro' : 'claro');
    }
});
