// Variables

let nav = document.getElementById('nav');
let menu = document.getElementById('enlaces');
let abrir = document.getElementById('open');
let botones = document.getElementsByClassName('btn-header');
let cerrado = true;

function menus(){
    let desplazamientoActual = window.scrollY;

    if(desplazamientoActual <= 300){
        nav.classList.remove('nav2');
        nav.className = ('nav1');
        nav.style.transition = '1s';
        menu.style.top = '80px';
    }else{
        nav.classList.remove('nav1');
        nav.className = ('nav2');
        nav.style.transition = '1s';
        menu.style.top = '100px';
    }
}

function cerrarMenu(){
    menu.style.width = '0%';
    menu.style.overflow = 'hidden';
    cerrado = true;
    abrir.setAttribute('aria-expanded', 'false');
    abrir.setAttribute('aria-label', 'Abrir menú');
}

function apertura(){
    if(cerrado){
        menu.style.width = '70vw';
        cerrado = false;
        abrir.setAttribute('aria-expanded', 'true');
        abrir.setAttribute('aria-label', 'Cerrar menú');
    }else{
        cerrarMenu();
    }
}

menus();
window.addEventListener('click',function(e){
    if(!cerrado && !abrir.contains(e.target)){
        cerrarMenu();
    }
});
// Con la tecla Escape también se cierra el menú
document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !cerrado){
        cerrarMenu();
        abrir.focus();
    }
});
window.addEventListener('scroll', function(){
    menus();
});
window.addEventListener('resize', function(){
    if(window.innerWidth >= 700){
        cerrado = true;
        abrir.setAttribute('aria-expanded', 'false');
        abrir.setAttribute('aria-label', 'Abrir menú');
        menu.style.removeProperty('overflow');
        menu.style.removeProperty('width');
    }
});
abrir.addEventListener('click', function(){
    apertura();
});