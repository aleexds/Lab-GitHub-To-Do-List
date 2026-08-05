// Seleccionar elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Función para añadir una tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = taskText;
        span.style.cursor = 'pointer';
        
        span.addEventListener('click', function() {
            span.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = '';
    } else {
        alert('Por favor, escribe una tarea.');
    }
}

// Función para filtrar las tareas
function filterTasks(event) {
    // Quitar la clase 'active' de todos los botones
    filterBtns.forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    // Añadir la clase 'active' al botón clickeado
    event.target.classList.add('active');

    const filter = event.target.getAttribute('data-filter');
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(function(task) {
        const isCompleted = task.querySelector('span').classList.contains('completed');

        if (filter === 'all') {
            task.style.display = 'flex';
        } else if (filter === 'active') {
            task.style.display = isCompleted ? 'none' : 'flex';
        } else if (filter === 'completed') {
            task.style.display = isCompleted ? 'flex' : 'none';
        }
    });
}

// Escuchar eventos
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Añadir evento a cada botón de filtro
filterBtns.forEach(function(btn) {
    btn.addEventListener('click', filterTasks);
});