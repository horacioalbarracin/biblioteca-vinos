class Vino{

    constructor(id,nombre,vinoname,year_wine,foto_vino_recomd){
        this.id=id;
        this.nombre=nombre;
        this.vinoname=vinoname;
        this.year_wine=year_wine;
        this.foto_vino_recomd=foto_vino_recomd;
        
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
                        <td>${vino.vinoname}</td>
                        <td>${vino.year_wine}</td>
                        <td>${vino.foto_vino_recomd}</td>
                        <td>
                            <img src="${vino.foto_vino_recomd}" alt="${vino.vinoname}" width="30%">
                        </td>
                        <td>
                            <button class="btn-send" onclick='updateVino(${vino.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-send" onclick='deleteVino(${vino.id})'><i class="fa fa-trash" ></button></i>
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
    const inputId = document.querySelector('#id-vino');
    const inputnombre = document.querySelector('#firstname');
    const inputvinoname = document.querySelector('#vinoname');
    const inputyear_wine = document.querySelector('#year_wine');
    const inputfoto_vino_recomd = document.querySelector('#foto_vino_recomd');
    

    //Realizo una validación simple de acuerdo al contenido del value del input del nombre del vino
    if(inputvinoname.value.trim() !== ''){
        //Busca en localstorage el item vinos, si no existe asigna el array vacio.
        let vinos = JSON.parse(localStorage.getItem('vinos')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del array de vinos el objeto a editar
            const vinoFind = vinos.find(vino => vino.id == inputId.value);
            //Si existe actualizo el objeto
            if (vinoFind) {
              vinoFind.nombre = inputnombre.value;
              vinoFind.vinoname = inputvinoname.value;
              vinoFind.year_wine = inputyear_wine.value;
              vinoFind.foto_vino_recomd = inputfoto_vino_recomd.value;
              
            }
        }else{
            let newVino = new Vino(
                vinos.length+1,
                inputnombre.value,
                inputvinoname.value,
                inputyear_wine.value,
                inputfoto_vino_recomd.value,
                
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
 * @param {number} vinoId id vino que se va a actualizar
 */
function updateVino(vinoId){
    let vinos = JSON.parse(localStorage.getItem('vinos'));
    //se utiliza el metodo find para poder asegurarnos que exista un vino con el id que queremos eliminar.
    let vinoToUpdate = vinos.find(vino => vino.id===vinoId);
    if(vinoToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-vino');
        const inputnombre = document.querySelector('#firstname');
        const inputvinoname = document.querySelector('#vinoname');
        const inputyear_wine = document.querySelector('#year_wine');
        const inputfoto_vino_recomd = document.querySelector('#foto_vino_recomd');
        
        //Se cargan los inputs con los valores del vino encontrado
        inputId.value = vinoToUpdate.id;
        inputnombre.value = vinoToUpdate.nombre;
        inputvinoname.value = vinoToUpdate.vinoname;
        inputyear_wine.value = vinoToUpdate.year_wine;
        inputfoto_vino_recomd.value = vinoToUpdate.foto_vino_recomd;
        
    }
}

/**
 * Function que permite eliminar un vino del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} vinoId id vino que se va a eliminar
 */
function deleteVino(vinoId){
    let vinos = JSON.parse(localStorage.getItem('vinos'));
    //se utiliza el metodo find para poder asegurarnos que exista un vino con el id que queremos eliminar.
    let vinoToDelete = vinos.find(vino => vino.id===vinoId);
    if(vinoToDelete){
        //se utiliza el metodo filter para actualizar el array de vinos, sin tener el elemento encontrado en cuestion.
        vinos = vinos.filter(vino => vino.id !== vinoToDelete.id);
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

    const btnSaveVino = document.querySelector('#btn-send');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveVino.addEventListener('click',saveVinos);
    showVinos();
});
