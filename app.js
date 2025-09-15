// Variables
const participantes = [];
let asignaciones = {};

// Agregar participante
function agregarParticipante(nombre) {
    if (!nombre) return false;
    if (!participantes.includes(nombre)) {
        participantes.push(nombre);
        return true;
    }
    return false;
}

// Actualizar lista en la interfaz de usuario
function actualizarListas() {
    const ulParticipantes = document.getElementById('listaParticipantes');
    if (!ulParticipantes) return;
    ulParticipantes.innerHTML = '';
    participantes.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        ulParticipantes.appendChild(li);
    });
}

// Mostrar resultado en la interfaz de usuario
function mostrarAsignaciones() {
    const ulResultado = document.getElementById('resultado');
    if (!ulResultado) return;
    ulResultado.innerHTML = '';
    for (const participante in asignaciones) {
        const li = document.createElement('li');
        li.textContent = `${participante} es el amigo secreto de: ${asignaciones[participante]}`;
        ulResultado.appendChild(li);
    }
}

// Interfaz de usuario: agregar participante
function agregarParticipanteDesdeUI() {
    const input = document.getElementById('inputParticipante');
    if (!input) return;
    const nombre = input.value.trim();
    if (!nombre) {
        alert("Por favor ingresa un nombre.");
        return;
    }
    if (agregarParticipante(nombre)) {
        input.value = '';
        actualizarListas();
    } else {
        alert("Ese participante ya fue agregado.");
    }
}

// Limpiar participantes y resultados
function limpiarParticipantes() {
    participantes.length = 0;
    asignaciones = {};
    actualizarListas();
    const ulResultado = document.getElementById('resultado');
    if (ulResultado) ulResultado.innerHTML = '';
}

// Sorteo de amigo secreto
function sortearAmigosDesdeUI() {
    asignaciones = {};
    if (participantes.length < 2) {
        alert("Agrega al menos 2 participantes para sortear.");
        return;
    }
    let amigos = [...participantes];
    let valido = false;
    let intentos = 0;
    while (!valido && intentos < 100) {
        amigos = shuffle([...participantes]);
        valido = participantes.every((p, i) => p !== amigos[i]);
        intentos++;
    }
    if (!valido) {
        alert("No se pudo realizar un sorteo válido. Intenta de nuevo.");
        return;
    }
    participantes.forEach((p, i) => {
        asignaciones[p] = amigos[i];
    });
    mostrarAsignaciones();
}

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Reiniciar todo
function reiniciarTodo() {
    limpiarParticipantes();
}

// Al cargar la página, actualiza las listas
window.onload = actualizarListas;
