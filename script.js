document.addEventListener('DOMContentLoaded', function() {
    const listNameInput = document.getElementById('list-name-input');
    const listColorInput = document.getElementById('list-color-input');
    const createListBtn = document.getElementById('create-list-btn');
    const listsContainer = document.getElementById('lists-container');

    // Función para crear una nueva lista
    function createList() {
        const listName = listNameInput.value.trim();
        if (listName === '') return;

        const listId = Date.now(); // ID único para la lista
        const listColor = listColorInput.value;

        const listElement = document.createElement('div');
        listElement.className = 'task-list';
        listElement.dataset.id = listId;
        listElement.style.backgroundColor = listColor;

        listElement.innerHTML = `
            <div class="list-header">
                <div class="list-title-container">
                    <h3 class="list-title">${listName}</h3>
                    <input type="text" class="edit-list-title" value="${listName}">
                </div>
                <div class="list-actions">
                    <button class="list-btn edit-list-btn" title="Editar nombre">✏️</button>
                    <button class="list-btn delete-list-btn" title="Eliminar lista">🗑️</button>
                </div>
            </div>
            <div class="task-input-section">
                <input type="text" class="task-input" placeholder="Nueva tarea...">
                <button class="add-task-btn">Agregar</button>
            </div>
            <ul class="task-items"></ul>
        `;

        // Agregar eventos a los elementos de la lista
        const deleteListBtn = listElement.querySelector('.delete-list-btn');
        deleteListBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres eliminar esta lista y todas sus tareas?')) {
                listsContainer.removeChild(listElement);
            }
        });

        // Editar nombre de la lista
        const editListBtn = listElement.querySelector('.edit-list-btn');
        const listTitle = listElement.querySelector('.list-title');
        const editListTitle = listElement.querySelector('.edit-list-title');

        editListBtn.addEventListener('click', () => {
            listTitle.style.display = 'none';
            editListTitle.style.display = 'block';
            editListTitle.focus();
            editListTitle.select();
        });

        editListTitle.addEventListener('blur', () => {
            saveListTitle(listTitle, editListTitle);
        });

        editListTitle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveListTitle(listTitle, editListTitle);
            }
        });

        // Funcionalidad de tareas
        const addTaskBtn = listElement.querySelector('.add-task-btn');
        const taskInput = listElement.querySelector('.task-input');
        const taskItems = listElement.querySelector('.task-items');

        addTaskBtn.addEventListener('click', () => addTask(taskInput, taskItems));
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask(taskInput, taskItems);
            }
        });

        listsContainer.appendChild(listElement);
        listNameInput.value = '';
        listColorInput.value = '#f9f9f9';
    }

    // Función para guardar el nuevo nombre de la lista
    function saveListTitle(titleElement, inputElement) {
        const newTitle = inputElement.value.trim();
        if (newTitle !== '') {
            titleElement.textContent = newTitle;
        }
        titleElement.style.display = 'block';
        inputElement.style.display = 'none';
    }

    // Función para agregar una tarea a una lista específica
    function addTask(inputElement, itemsContainer) {
        const taskText = inputElement.value.trim();
        if (taskText === '') return;

        const taskId = Date.now(); // ID único para la tarea
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = taskId;

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <div class="task-text-container">
                <span class="task-text">${taskText}</span>
                <input type="text" class="edit-task-input" value="${taskText}">
            </div>
            <div class="task-actions">
                <button class="task-btn edit-task-btn" title="Editar tarea">✏️</button>
                <button class="task-btn delete-task-btn" title="Eliminar tarea">🗑️</button>
            </div>
        `;

        // Funcionalidad de la tarea
        const checkbox = taskItem.querySelector('.task-checkbox');
        const taskTextElement = taskItem.querySelector('.task-text');
        const editTaskInput = taskItem.querySelector('.edit-task-input');
        const editTaskBtn = taskItem.querySelector('.edit-task-btn');
        const deleteBtn = taskItem.querySelector('.delete-task-btn');

        checkbox.addEventListener('change', function() {
            taskTextElement.classList.toggle('completed');
        });

        // Editar tarea
        editTaskBtn.addEventListener('click', () => {
            taskTextElement.style.display = 'none';
            editTaskInput.style.display = 'block';
            editTaskInput.focus();
            editTaskInput.select();
        });

        editTaskInput.addEventListener('blur', () => {
            saveTaskText(taskTextElement, editTaskInput);
        });

        editTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveTaskText(taskTextElement, editTaskInput);
            }
        });

        // Eliminar tarea
        deleteBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                itemsContainer.removeChild(taskItem);
            }
        });

        itemsContainer.appendChild(taskItem);
        inputElement.value = '';
    }

    // Función para guardar el texto editado de la tarea
    function saveTaskText(textElement, inputElement) {
        const newText = inputElement.value.trim();
        if (newText !== '') {
            textElement.textContent = newText;
        }
        textElement.style.display = 'block';
        inputElement.style.display = 'none';
    }

    // Event listeners
    createListBtn.addEventListener('click', createList);
    listNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createList();
        }
    });
});