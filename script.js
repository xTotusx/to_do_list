document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Función para agregar una nueva tarea
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.addEventListener('change', toggleTask);

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', deleteTask);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
        taskInput.value = '';
    }

    // Función para marcar/desmarcar una tarea como completada
    function toggleTask(e) {
        const taskText = e.target.nextElementSibling;
        taskText.classList.toggle('completed');
    }

    // Función para eliminar una tarea
    function deleteTask(e) {
        const taskItem = e.target.parentElement;
        taskList.removeChild(taskItem);
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});