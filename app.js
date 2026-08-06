// Seleccionar elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const errorMsg = document.getElementById('errorMsg');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const taskCount = document.getElementById('taskCount');

// Función para actualizar el contador de tareas pendientes
function updateTaskCount() {
    const tasks = taskList.querySelectorAll('li');
    let activeTasks = 0;
    
    tasks.forEach(function(task) {
        if (!task.querySelector('span').classList.contains('completed')) {
            activeTasks++;
        }
    });
    
    taskCount.textContent = activeTasks;
}

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
        updateTaskCount();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
        updateTaskCount();
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
    updateTaskCount();
}

// Función para añadir una tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        errorMsg.style.display = 'none';
        taskInput.classList.remove('input-error'); // Quitar error visual
        
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
        updateTaskCount();
    } else {
        errorMsg.style.display = 'block';
        taskInput.classList.add('input-error'); // Añadir error visual
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
        span.parentElement.remove();
    });
    saveTasks();
    updateTaskCount();
}

// Escuchar eventos
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskInput.addEventListener('input', function() {
    errorMsg.style.display = 'none';
    taskInput.classList.remove('input-error'); // Quitar error al escribir
});

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', filterTasks);
});

clearCompletedBtn.addEventListener('click', clearCompletedTasks);

loadTasks();