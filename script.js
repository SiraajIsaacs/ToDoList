const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedTasksContainer = document.getElementById("completed-tasks");
const clearAllTasksButton = document.getElementById("clearAllTasksButton");

        function addTask(){
            if(inputBox.value === ''){
                alert("You must enter a task!");
            }
            else{
                let li = document.createElement('li');
                li.innerHTML = `<input type="checkbox">${inputBox.value} <button onclick="deleteTask(this)">Delete</button>`;
                listContainer.appendChild(li);
                inputBox.value = "";
                // When adding a task, saveData will be called and data will be saved.
                saveData();
            }
        }

        listContainer.addEventListener("change", function(e){
            // If a checkbox is clicked
            if(e.target.tagName === "INPUT" && e.target.type === "checkbox"){
                // Get the parent li element
                let taskItem = e.target.parentElement;
                // If the checkbox is checked
                if(e.target.checked){
                    // Move the task to the completed tasks section
                    completedTasksContainer.appendChild(taskItem);
                }
                else{
                    // Move the task back to the task list section
                    listContainer.appendChild(taskItem);
                }
                saveData();
            }
        });

        function deleteTask(button){
            button.parentElement.remove();
            saveData();
        }

        function clearAllTasks() {
            listContainer.innerHTML = "";
            completedTasksContainer.innerHTML = "";
            localStorage.clear();
        }

        function saveData(){
            localStorage.setItem("tasks", listContainer.innerHTML);
            localStorage.setItem("completedTasks", completedTasksContainer.innerHTML);
        }

        function showTasks(){
            listContainer.innerHTML = localStorage.getItem("tasks") || "";
            completedTasksContainer.innerHTML = localStorage.getItem("completedTasks") || "";

            // Add event listeners to delete buttons for tasks
            let deleteButtonsTasks = document.querySelectorAll("#list-container button");
            deleteButtonsTasks.forEach(function(button){
                button.addEventListener("click", function(){
                    deleteTask(button);
                });
            });

            // Add event listeners to delete buttons for completed tasks
            let deleteButtonsCompletedTasks = document.querySelectorAll("#completed-tasks button");
            deleteButtonsCompletedTasks.forEach(function(button){
                button.addEventListener("click", function(){
                    deleteTask(button);
                });
            });
        }

        showTasks();

        // Add event listener to the clear all tasks button
        clearAllTasksButton.addEventListener("click", clearAllTasks);