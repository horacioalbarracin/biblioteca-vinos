document.addEventListener('DOMContentLoaded', function() {
    var formRegister = document.getElementById('formRegister');
    var firstNameInput = document.getElementById('firstname');
    var lastNameInput = document.getElementById('lastname');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var birthdateInput = document.getElementById('birthdate');
    var dniInput = document.getElementById('dni');
    formRegister.addEventListener('submit', function(event) {
        var errorFirstName = document.getElementById('error-firstname');
        var errorLastName = document.getElementById('error-lastname');
        var errorEmail = document.getElementById('error-email');
        var errorPassword = document.getElementById('error-password');
        var errorBirthdate = document.getElementById('error-birthdate');
        var errorDni = document.getElementById('error-dni');
        

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

        if (emailInput.value.trim() === '') {
            errorEmail.textContent = 'Falta ingresar el correo electrónico';
            errorEmail.classList.add('error-text'); // Agrega la clase de texto de error
            emailInput.classList.add('input-error', 'email'); // Agrega la clase de error al campo de apellido
            event.preventDefault(); // Evita que el formulario se envíe
        }else if (validateEmail(emailInput.value.trim()) == false) {
            errorEmail.textContent = 'Formato del correo electrónico incorrecto';
            errorEmail.classList.add('error-text'); // Agrega la clase de texto de error
            emailInput.classList.add('input-error', 'email'); // Agrega la clase de error al campo de apellido
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorEmail.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorEmail.classList.remove('error-text'); // Remueve la clase de texto de error
            emailInput.classList.remove('input-error', 'email'); // Remueve la clase de error si el campo no está vacío
        }

        if (passwordInput.value.trim() === '') {
            errorPassword.textContent = 'Falta ingresar password';
            errorPassword.classList.add('error-text'); // Agrega la clase de texto de error
            passwordInput.classList.add('input-error', 'password'); // Agrega la clase de error al campo de nombre
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorPassword.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorPassword.classList.remove('error-text'); // Remueve la clase de texto de error
            passwordInput.classList.remove('input-error', 'password'); // Remueve la clase de error si el campo no está vacío
        }

        if (dniInput.value.trim() === '') {
            errorDni.textContent = 'Falta ingresar imagen del dni';
            errorDni.classList.add('error-text'); // Agrega la clase de texto de error
            dniInput.classList.add('input-error', 'dni'); // Agrega la clase de error al campo de nombre
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            errorDni.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorDni.classList.remove('error-text'); // Remueve la clase de texto de error
            dniInput.classList.remove('input-error', 'dni'); // Remueve la clase de error si el campo no está vacío
        }

        if (birthdateInput.value.trim() === '') {
            errorBirthdate.textContent = 'Falta ingresar fecha de nacimiento';
            errorBirthdate.classList.add('error-text'); // Agrega la clase de texto de error
            birthdateInput.classList.add('input-error', 'birthdate'); // Agrega la clase de error al campo de apellido
            event.preventDefault(); // Evita que el formulario se envíe
        }else if (validarEdad(birthdateInput.value.trim()) == false) {
            errorBirthdate.textContent = 'Tiene que ser mayor de edad para registrarse';
            errorBirthdate.classList.add('error-text'); // Agrega la clase de texto de error
            birthdateInput.classList.add('input-error', 'birthdate'); // Agrega la clase de error al campo de apellido
            event.preventDefault(); // Evita que el formulario se envíe
            alert('Tiene que ser mayor de edad para registrarse');
        } else {
            errorBirthdate.textContent = ''; // Borra el mensaje de error si el campo no está vacío
            errorBirthdate.classList.remove('error-text'); // Remueve la clase de texto de error
            birthdateInput.classList.remove('input-error', 'birthdate'); // Remueve la clase de error si el campo no está vacío
        }
    });
});

function validateEmail(email){
	var formatoEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if( formatoEmail.test(email) ){
	    return true;
    }else{
		return false;
    }
}

function validarEdad(fechaNacimiento) {
    let fecNac = new Date(fechaNacimiento);
    let hoy = new Date();

    let edad = hoy.getFullYear() - fecNac.getFullYear();
    let mes = hoy.getMonth() - fecNac.getMonth();

    if(mes < 0 || (mes === 0 && hoy.getDate() < fecNac.getDate() )) {
        edad--;
    }
    return edad >=18;
}

function validarArchivo() {
    var archivo = document.getElementById('dni');
	var archivoRuta = archivo.value;
	var extPermitidas = /(.jpeg|.jpg|.png)$/i;
    if(!extPermitidas.exec(archivoRuta)){
		document.getElementById('error-dni').textContent = 'Debe seleccionar una imagen del dni';
        document.getElementById('error-dni').classList.add('error-text'); 
        document.getElementById('dni').classList.add('input-error', 'dni'); 
        return false;
	} else {
        document.getElementById('error-dni').textContent = '';
        document.getElementById('error-dni').classList.remove('error-text'); 
        document.getElementById('dni').classList.remove('input-error', 'dni');
		if (archivo.files && archivo.files[0]) 
		{
			var visor = new FileReader();
			visor.onload = function(e) 
			{
				document.getElementById('visor').innerHTML = 
				'<embed src="'+e.target.result+'" width="100" height="100" />';
			};
			visor.readAsDataURL(archivo.files[0]);
		}
	}
	return false;	
}