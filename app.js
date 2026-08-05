// Seleccionar elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Función para añadir una tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Crear el elemento <li>
        const li = document.createElement('li');
        
        // Crear un span para contener el texto de la tarea
        const span = document.createElement('span');
        span.textContent = taskText;
        
        // Crear el botón de borrar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';

        // Función para eliminar la tarea
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        // Añadir el texto y el botón al <li>
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Añadir el <li> a la lista <ul>
        taskList.appendChild(li);

        // Limpiar el campo de texto
        taskInput.value = '';
    } else {
        alert('Por favor, escribe una tarea.');
    }
}

// Escuchar el clic en el botón de añadir
addBtn.addEventListener('click', addTask);

// Escuchar la tecla Enter en el campo de texto
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});