// Seleccionar elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const errorMsg = document.getElementById('errorMsg');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Función refactorizada para crear un elemento de tarea
function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = taskText;
    span.style.cursor = 'pointer';
    
    if (isCompleted) {
        span.classList.add('completed');
    }

    span.addEventListener('click', function() {
        span.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
}

// Función para guardar tareas en LocalStorage
function saveTasks() {
    const tasks = [];
    const liElements = taskList.querySelectorAll('li');
    
    liElements.forEach(function(li) {
        const text = li.querySelector('span').textContent;
        const isCompleted = li.querySelector('span').classList.contains('completed');
        tasks.push({ text: text, completed: isCompleted });
    });
    
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde LocalStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task) {
            const li = createTaskElement(task.text, task.completed);
            taskList.appendChild(li);
        });
    }
    
    document.querySelector('[data-filter="all"]').classList.add('active');
}

// Función para añadir una tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        errorMsg.style.display = 'none'; // Ocultar error si había
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    } else {
        errorMsg.style.display = 'block'; // Mostrar error inline
    }
}

// Función para filtrar las tareas
function filterTasks(event) {
    filterBtns.forEach(function(btn) {
        btn.classList.remove('active');
    });
    
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

// Función para borrar tareas completadas
function clearCompletedTasks() {
    const completedTasks = taskList.querySelectorAll('li .completed');
    completedTasks.forEach(function(span) {
        span.parentElement.remove(); // Eliminar el <li> padre
    });
    saveTasks(); // Actualizar el LocalStorage
}

// Escuchar eventos
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Ocultar el mensaje de error cuando el usuario empieza a escribir
taskInput.addEventListener('input', function() {
    errorMsg.style.display = 'none';
});

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', filterTasks);
});

// Escuchar clic en el botón borrar completadas
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// Cargar las tareas guardadas al abrir la página
loadTasks();