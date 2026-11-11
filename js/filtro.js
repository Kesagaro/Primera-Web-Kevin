$(function () {
    $('.filter').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let valor = $(this).attr('data-nombre');
        if (valor == 'todos') {
            $('.cont-work').show('1000');
        } else {
            $('.cont-work').not('.' + valor).hide('1000');
            $('.cont-work').filter('.' + valor).show('1000');
        }
    });

    // Calcula la posición al hacer clic, así siempre es correcta aunque cambie el tamaño de la ventana
    function irA(selector) {
        return function (e) {
            e.preventDefault();
            let destino = selector ? $(selector).offset().top - 100 : 0;
            $('html, body').animate({ scrollTop: destino }, 600);
        };
    }

    $('#enlace-inicio').on('click', irA(null));
    $('#enlace-equipo').on('click', irA('#servicio'));
    $('#enlace-servicio').on('click', irA('#trabajo'));
    $('#enlace-contacto').on('click', irA('#contacto'));
});