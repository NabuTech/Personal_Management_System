document.addEventListener('DOMContentLoaded', function() {
    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTask(taskText);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('#task-list .task-name')).map(task => task.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a new task
    function createTask(taskText) {
        // Create a new list item
        const newTaskItem = document.createElement('li');
        newTaskItem.innerHTML = `
            <span class="task-name">${taskText}</span>
            <span class="delete-task">&times;</span> <!-- Use a delete icon instead of "Delete" button -->
        `;

        // Add event listener to mark task as completed on click
        newTaskItem.addEventListener('click', function(event) {
            const task = event.currentTarget; // Get the current target, which is the new task item
            task.classList.toggle('completed'); // Toggle the 'completed' class
            saveTasks(); // Save tasks after completion
        });
        
        // Add the new task item to the task list
        document.getElementById('task-list').appendChild(newTaskItem);
    }

    // Function to add a new task
    function addTask() {
        // Get the input field value
        const newTaskInput = document.getElementById('new-task');
        const taskText = newTaskInput.value.trim();

        // If the input field is not empty
        if (taskText !== '') {
            createTask(taskText);
            saveTasks(); // Save tasks after adding new task
            // Clear the input field
            newTaskInput.value = '';
        }
    }

    // Function to handle delete task
    function deleteTask(event) {
        if (event.target.classList.contains('delete-task')) {
            event.target.parentElement.remove();
            saveTasks(); // Save tasks after deletion
        }
    }

    // Event listener for the Add Task button
    document.getElementById('add-task').addEventListener('click', addTask);

    // Event delegation for delete buttons
    document.getElementById('task-list').addEventListener('click', deleteTask);

    // Load tasks when DOM content is loaded
    loadTasks();

    // Select the input element
    const newTaskInput = document.getElementById('new-task');

    // Add event listener for the "keypress" event
    newTaskInput.addEventListener('keypress', function(event) {
        // Check if the Enter key is pressed
        if (event.key === 'Enter') {
            // Prevent the default action of the Enter key (form submission)
            event.preventDefault();
            // Call the addTask function
            addTask();
            // Clear the input field value
            newTaskInput.value = '';
        }
    });
});
