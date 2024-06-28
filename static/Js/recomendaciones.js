document.addEventListener('DOMContentLoaded', function() {
    
    var firstNameInput = document.getElementById('firstname');
    var formRecomendaciones = document.getElementById('formRecomendaciones');
    var vinonameInput = document.getElementById('vinoname');
    var year_wineInput = document.getElementById('year_wine');
    var foto_vino_recomdInput = document.getElementById('foto_vino_recomd')

    // formulario Recomendaciones
    formRecomendaciones.addEventListener('submit', function(event) {
        var errorFirstName = document.getElementById('error-firstname');
        var errorvinoname = document.getElementById('error-vinoname');
        var erroryear_wine = document.getElementById('error-year_wine');
        var errorfoto_vino_recomd = document.getElementById('error-foto_vino_recomd');
        

        if (firstNameInput.value.trim() === '') {
            errorFirstName.textContent = 'Falta ingresar el nombre';
            errorFirstName.classList.add('error-text'); // Agrega la clase de texto de error
            firstNameInput.classList.add('input-error', 'firstname'); // Agrega la clase de error al campo de nombre
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorFirstName.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorFirstName.classList.remove('error-text'); // Remueve la clase de texto de error
            firstNameInput.classList.remove('input-error', 'firstname'); // Remueve la clase de error si el campo no está vacío
        }

        if (vinonameInput.value.trim() === '') {
            errorvinoname.textContent = 'Falta ingresar el nombre del vino';
            errorvinoname.classList.add('error-text'); // Agrega la clase de texto de error
            vinonameInput.classList.add('input-error', 'vinoname'); // Agrega la clase de error al campo del nombre del vino
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorvinoname.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorvinoname.classList.remove('error-text'); // Remueve la clase de texto de error
            vinonameInput.classList.remove('input-error', 'vinoname'); // Remueve la clase de error si el campo no está vacío
        }

        if (year_wineInput.value.trim() === '') {
            erroryear_wine.textContent = 'Falta año del vino';
            erroryear_wine.classList.add('error-text'); // Agrega la clase de texto de error
            year_wineInput.classList.add('input-error', 'year_wine'); // Agrega la clase de error al campo del año del vino
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            erroryear_wine.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            erroryear_wine.classList.remove('error-text'); // Remueve la clase de texto de error
            year_wineInput.classList.remove('input-error', 'year_wine'); // Remueve la clase de error si el campo no está vacío
        }

        if (foto_vino_recomdInput.value.trim() === '') {
            errorfoto_vino_recomd.textContent = 'Falta ingresar link foto';
            errorfoto_vino_recomd.classList.add('error-text'); // Agrega la clase de texto de error
            foto_vino_recomdInput.classList.add('input-error', 'foto_vino_recomd'); // Agrega la clase de error al campo de foto
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorfoto_vino_recomd.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorfoto_vino_recomdclassList.remove('error-text'); // Remueve la clase de texto de error
            foto_vino_recomdInput.classList.remove('input-error', 'foto_vino_recomd'); // Remueve la clase de error si el campo no está vacío
        }
        
    });
});



