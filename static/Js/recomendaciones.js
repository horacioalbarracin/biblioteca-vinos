document.addEventListener('DOMContentLoaded', function() {
    
    var nombreInput = document.getElementById('nombre');
    var formRecomendaciones = document.getElementById('formRecomendaciones');
    var nombre_vinoInput = document.getElementById('nombre_vino');
    var año_vinoInput = document.getElementById('año_vino');
    var fotoInput = document.getElementById('foto')

    // formulario Recomendaciones
    formRecomendaciones.addEventListener('submit', function(event) {
        var errornombre = document.getElementById('error-nombre');
        var errornombre_vino = document.getElementById('error-nombre_vino');
        var erroraño_vino = document.getElementById('error-año_vino');
        var errorfoto = document.getElementById('error-foto');
        

        if (nombreInput.value.trim() === '') {
            errornombre.textContent = 'Falta ingresar el nombre';
            errornombre.classList.add('error-text'); // Agrega la clase de texto de error
            nombreInput.classList.add('input-error', 'nombre'); // Agrega la clase de error al campo de nombre
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errornombre.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errornombre.classList.remove('error-text'); // Remueve la clase de texto de error
            nombreInput.classList.remove('input-error', 'nombre'); // Remueve la clase de error si el campo no está vacío
        }

        if (nombre_vinoInput.value.trim() === '') {
            errornombre_vino.textContent = 'Falta ingresar el nombre del vino';
            errornombre_vino.classList.add('error-text'); // Agrega la clase de texto de error
            nombre_vinoInput.classList.add('input-error', 'nombre_vino'); // Agrega la clase de error al campo del nombre del vino
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errornombre_vino.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errornombre_vino.classList.remove('error-text'); // Remueve la clase de texto de error
            nombre_vinoInput.classList.remove('input-error', 'nombre_vino'); // Remueve la clase de error si el campo no está vacío
        }

        if (año_vinoInput.value.trim() === '') {
            erroraño_vino.textContent = 'Falta año del vino';
            erroraño_vino.classList.add('error-text'); // Agrega la clase de texto de error
            año_vinoInput.classList.add('input-error', 'año_vino'); // Agrega la clase de error al campo del año del vino
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            erroraño_vino.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            erroraño_vino.classList.remove('error-text'); // Remueve la clase de texto de error
            año_vinoInput.classList.remove('input-error', 'año_vino'); // Remueve la clase de error si el campo no está vacío
        }

        if (fotoInput.value.trim() === '') {
            errorfoto.textContent = 'Falta ingresar link foto';
            errorfoto.classList.add('error-text'); // Agrega la clase de texto de error
            fotoInput.classList.add('input-error', 'foto'); // Agrega la clase de error al campo de foto
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorfoto.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorfotoclassList.remove('error-text'); // Remueve la clase de texto de error
            fotoInput.classList.remove('input-error', 'foto'); // Remueve la clase de error si el campo no está vacío
        }
        
    });
});



