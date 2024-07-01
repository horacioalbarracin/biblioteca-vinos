class Vino{

    constructor(id_vino,nombre,nombre_vino,año_vino,foto){
        this.id_vino=id_vino;
        this.nombre=nombre;
        this.nombre_vino=nombre_vino;
        this.año_vino=año_vino;
        this.foto=foto;
        
    }

}

function showVinos(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let vinos = JSON.parse(localStorage.getItem('vinos')) || [];

    //buscar elemento HTML donde quiero insertar los vinos
    const tbodyVinos = document.querySelector('#list-table-vinos tbody');
    //limpio el contenido de la tabla
    tbodyVinos.innerHTML = '';
    vinos.forEach(vino => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
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
                    </tr>
        `;
        tbodyVinos.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveVinos(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#formRecomendaciones');

    //obtengo los inputs del formulario
    const inputid_vino = document.querySelector('#id-vino');
    const inputnombre = document.querySelector('#nombre');
    const inputnombre_vino = document.querySelector('#nombre_vino');
    const inputaño_vino = document.querySelector('#año_vino');
    const inputfoto = document.querySelector('#foto');
    

    //Realizo una validación simple de acuerdo al contenido del value del input del nombre del vino
    if(inputnombre_vino.value.trim() !== ''){
        //Busca en localstorage el item vinos, si no existe asigna el array vacio.
        let vinos = JSON.parse(localStorage.getItem('vinos')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputid_vino.value!==""){
            //Busco dentro del array de vinos el objeto a editar
            const vinoFind = vinos.find(vino => vino.id_vino == inputid_vino.value);
            //Si existe actualizo el objeto
            if (vinoFind) {
              vinoFind.nombre = inputnombre.value;
              vinoFind.nombre_vino = inputnombre_vino.value;
              vinoFind.año_vino = inputaño_vino.value;
              vinoFind.foto = inputfoto.value;
              
            }
        }else{
            let newVino = new Vino(
                vinos.length+1,
                inputnombre.value,
                inputnombre_vino.value,
                inputaño_vino.value,
                inputfoto.value,
                
            );
            vinos.push(newVino);
        }

        //Se actualiza el array de vinos en el localstorage
        localStorage.setItem('vinos',JSON.stringify(vinos));
        showVinos();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Titulo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar un vino
 * de acuedo al id del vino
 * @param {number} vinoid id vino que se va a actualizar
 */
function updateVino(vinoid){
    let vinos = JSON.parse(localStorage.getItem('vinos'));
    //se utiliza el metodo find para poder asegurarnos que exista un vino con el id que queremos eliminar.
    let vinoToUpdate = vinos.find(vino => vino.id_vino===vinoid);
    if(vinoToUpdate){
        //Se buscan los elementos HTML del input
        const inputid_vino = document.querySelector('#id-vino');
        const inputnombre = document.querySelector('#nombre');
        const inputnombre_vino = document.querySelector('#nombre_vino');
        const inputaño_vino = document.querySelector('#año_vino');
        const inputfoto = document.querySelector('#foto');
        
        //Se cargan los inputs con los valores del vino encontrado
        inputid_vino.value = vinoToUpdate.id_vino;
        inputnombre.value = vinoToUpdate.nombre;
        inputnombre_vino.value = vinoToUpdate.nombre_vino;
        inputaño_vino.value = vinoToUpdate.año_vino;
        inputfoto.value = vinoToUpdate.foto;
        
    }
}

/**
 * Function que permite eliminar un vino del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} vinoid id vino que se va a eliminar
 */
function deleteVino(vinoid){
    let vinos = JSON.parse(localStorage.getItem('vinos'));
    //se utiliza el metodo find para poder asegurarnos que exista un vino con el id que queremos eliminar.
    let vinoToDelete = vinos.find(vino => vino.id_vino===vinoid);
    if(vinoToDelete){
        //se utiliza el metodo filter para actualizar el array de vinos, sin tener el elemento encontrado en cuestion.
        vinos = vinos.filter(vino => vino.id_vino !== vinoToDelete.id_vino);
        //se actualiza el localstorage
        localStorage.setItem('vinos',JSON.stringify(vinos));
        showVinos();
        Swal.fire({
            title: 'Exito!',
            text: 'El vino fue eliminado.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveVino = document.querySelector('#btn-save-vino');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveVino.addEventListener('click',saveVinos);
    showVinos();
});
