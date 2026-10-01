/*--------------------------------------*/
/*--|funcionalidad_atletas_destacados|--*/
/*--------------------------------------*/
const atletas = document.querySelectorAll(".atleta");
const botonRestablecer = document.getElementById("boton_restablecer");
const mensajeGeneral = document.getElementById("mensaje_general");
const datosIniciales = {
    1: {
        nombre: "Mariana López",
        deporte: "Atletismo",
        descripcion: "Atleta especializada en carreras de velocidad."
    },
    2: {
        nombre: "Carlos Ramírez",
        deporte: "Natación",
        descripcion: "Deportista dedicado a la natación competitiva."
    },
    3: {
        nombre: "Andrés Torres",
        deporte: "Fútbol",
        descripcion: "Jugador destacado por su trabajo en equipo."
    }
};
/*-------------------------------------------*/
/*--|obtener_los_datos_usando_localstorage|--*/
/*-------------------------------------------*/
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`atleta_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
/*-----------------------*/
/*--|mostrar_los_datos|--*/
/*-----------------------*/
function mostrarDatos(atleta) {
    const id = atleta.dataset.id;
    const datos = obtenerDatos(id);
    const nombre = atleta.querySelector(".campo_nombre");
    const deporte = atleta.querySelector(".campo_deporte");
    const descripcion = atleta.querySelector(".campo_descripcion");
    nombre.value = datos.nombre;
    deporte.value = datos.deporte;
    descripcion.value = datos.descripcion;
}
/*----------------------------------------------------*/
/*--|guardar_y_restaurar_los_datos_con_localstorage|--*/
/*----------------------------------------------------*/
function guardarDatos(atleta) {
    const id = atleta.dataset.id;
    const nombre = atleta.querySelector(".campo_nombre").value;
    const deporte = atleta.querySelector(".campo_deporte").value;
    const descripcion = atleta.querySelector(".campo_descripcion").value;
    const datos = {
        nombre: nombre,
        deporte: deporte,
        descripcion: descripcion
    };
    localStorage.setItem(`atleta_${id}`, JSON.stringify(datos));
    mostrarMensajeAtleta(atleta, "Información guardada correctamente.");
}
function restaurarDatos(atleta) {
    const id = atleta.dataset.id;
    const datos = datosIniciales[id];
    atleta.querySelector(".campo_nombre").value = datos.nombre;
    atleta.querySelector(".campo_deporte").value = datos.deporte;
    atleta.querySelector(".campo_descripcion").value = datos.descripcion;
    localStorage.removeItem(`atleta_${id}`);
    mostrarMensajeAtleta(atleta, "Información restaurada.");
}
/*-----------------------------------*/
/*--|mostrar_el_mensaje_del_atleta|--*/
/*-----------------------------------*/
function mostrarMensajeAtleta(atleta, texto) {
    const mensaje = atleta.querySelector(".mensaje_atleta");
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}
/*-------------------------------------------*/
/*--|restablecer_todos_usando_localstorage|--*/
/*-------------------------------------------*/
function restablecerTodos() {
    const confirmacion = confirm("¿Deseas restablecer todos los atletas?");
    if (!confirmacion) {
        return;
    }
    atletas.forEach((atleta) => {
        const id = atleta.dataset.id;
        localStorage.removeItem(`atleta_${id}`);
        mostrarDatos(atleta);
    });
    mensajeGeneral.textContent = "Todos los atletas fueron restablecidos.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2000);
}
/*----------------------------*/
/*--|eventos_de_los_atletas|--*/
/*----------------------------*/
atletas.forEach((atleta) => {
    const botonGuardar = atleta.querySelector(".boton_guardar");
    const botonRestaurar = atleta.querySelector(".boton_restaurar");
    botonGuardar.addEventListener("click", () => {
        guardarDatos(atleta);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(atleta);
    });
});
/*-----------------------------------------*/
/*--|evento_restablecer_todos_a_un_click|--*/
/*-----------------------------------------*/
botonRestablecer.addEventListener("click", restablecerTodos);
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    atletas.forEach((atleta) => {
        mostrarDatos(atleta);
    });
}
cargarDatos();