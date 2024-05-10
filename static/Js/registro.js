document.addEventListener('DOMContentLoaded', function() {
    var formRegister = document.getElementById('formRegister');
    var firstNameInput = document.getElementById('firstname');
    var lastNameInput = document.getElementById('lastname');

    formRegister.addEventListener('submit', function(event) {
        var errorFirstName = document.getElementById('error-firstname');
        var errorLastName = document.getElementById('error-lastname');

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

        if (lastNameInput.value.trim() === '') {
            errorLastName.textContent = 'Falta ingresar el apellido';
            errorLastName.classList.add('error-text'); // Agrega la clase de texto de error
            lastNameInput.classList.add('input-error', 'lastname'); // Agrega la clase de error al campo de apellido
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorLastName.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorLastName.classList.remove('error-text'); // Remueve la clase de texto de error
            lastNameInput.classList.remove('input-error', 'lastname'); // Remueve la clase de error si el campo no está vacío
        }
    });
});
