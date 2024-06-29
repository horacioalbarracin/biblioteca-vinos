const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de vinos
 * por medio del uso de template string de JS.
 */
async function showVinos(){
    let vinos =  await fetchData(BASEURL+'/api/vinos/', 'GET');
    const tableVinos = document.querySelector('#list-table-vinos tbody');
    tableVinos.innerHTML='';
    vinos.forEach((vino, index) => {
      let tr = `<tr>
                    <td>${vino.nombre}</td>
                    <td>${vino.nombre_vino}</td>
                    <td>${vino.año_vino}</td>
                    <td>
                        <img src="${vino.foto}" alt="${vino.nombre_vino}" width="30%">
                    </td>
                    <td>
                        <button class="btn-save-vino" onclick='updateVino(${vino.id_vino})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-save-vino" onclick='deleteVino(${vino.id_vino})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableVinos.insertAdjacentHTML("beforeend",tr);
    });
  }

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de vino
 * @returns 
 */
async function saveVino(){
    const idVino = document.querySelector('#id-vino').value;
    const nombre = document.querySelector('#nombre').value;
    const nombre_vino = document.querySelector('#nombre_vino').value;
    const año_vino = document.querySelector('#año_vino').value;
    const foto = document.querySelector('#foto').value;
    //VALIDACION DE FORMULARIO
    if (!nombre || !nombre_vino || !año_vino || !foto) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del vino
    const vinoData = {
        nombre: nombre,
        nombre_vino: nombre_vino,
        año_vino: año_vino,
        foto: foto,
    };
  let result = null;
  // Si hay un idVino, realiza una petición PUT para actualizar el vino existente
  if(idVino!==""){
    result = await fetchData(`${BASEURL}/api/vinos/${idVino}`, 'PUT', vinoData);
  }else{
    // Si no hay idVino, realiza una petición POST para crear un nuevo vino
    result = await fetchData(`${BASEURL}/api/vinos/`, 'POST', vinoData);
  }
  
  const formVino = document.querySelector('#form-vino');
  formVino.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showVinos();
}
  
/**
 * Function que permite eliminar un vino del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id_vino posición del array que se va a eliminar
 */
function deleteVino(id_vino){
    Swal.fire({
        title: "¿Esta seguro de eliminar la recomendación?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(`Deleting wine with ID: ${id_vino}`);
          let response = await fetchData(`${BASEURL}/api/vinos/${id_vino}`, 'DELETE');
          console.log(`Response: `, response);
          showVinos();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos del vino 
 * para su edición
 * @param {number} id_vino Id del vino que se quiere editar
 */
async function updateVino(id_vino){
    //Buscamos en el servidor el vino de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/vinos/${id_vino}`, 'GET');
    const idVino = document.querySelector('#id-vino');
    const nombre = document.querySelector('#nombre');
    const nombre_vino = document.querySelector('#nombre_vino');
    const año_vino = document.querySelector('#año_vino');
    const foto = document.querySelector('#foto');
    
    idVino.value = response.id_vino;
    nombre.value = response.nombre;
    nombre_vino.value = response.nombre_vino;
    año_vino.value = response.año_vino;
    foto.value = response.foto;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveVino = document.querySelector('#btn-save-vino');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveVino.addEventListener('click',saveVino);
    showVinos();
});
  