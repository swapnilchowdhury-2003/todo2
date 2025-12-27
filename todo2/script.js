document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Add task on form submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        if (!taskText) return;

        const li = document.createElement('li');
        li.textContent = taskText;

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', () => {
            li.classList.add('done');
            saveTasks();
        });

        li.appendChild(doneButton);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('Done', '').trim(), // Remove button text
                done: li.classList.contains('done')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.classList.add('done-button');
            doneButton.addEventListener('click', () => {
                li.classList.add('done');
                saveTasks();
            });

            li.appendChild(doneButton);
            if (task.done) li.classList.add('done');
            taskList.appendChild(li);
        });
    }
});