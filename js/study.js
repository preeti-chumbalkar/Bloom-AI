// =======================================
// BLOOM AI STUDY PLANNER
// =======================================

const user = getCurrentUser();

// Load Tasks
let tasks = loadData("studyTasks", user) || [];

// Elements
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
const sortDeadline = document.getElementById("sortDeadline");

// ===============================
// Display Tasks
// ===============================

function displayTasks() {

    taskList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filter = filterStatus.value;

    let completed = 0;

    let displayArray = [...tasks];

    // Sort

    if (sortDeadline.value === "ascending") {

        displayArray.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    }

    if (sortDeadline.value === "descending") {

        displayArray.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

    }

    displayArray.forEach((task) => {

        const originalIndex = tasks.indexOf(task);

        // Search

        if (!task.subject.toLowerCase().includes(searchText)) {

            return;

        }

        // Filter

        if (filter === "completed" && !task.completed) {

            return;

        }

        if (filter === "pending" && task.completed) {

            return;

        }

        if (task.completed) {

            completed++;

        }

        taskList.innerHTML += `

        <div class="task-card">

            <h3>${task.subject}</h3>

            <p><strong>Unit :</strong> ${task.unit}</p>

            <p><strong>Topic :</strong> ${task.topic}</p>

            <p>

                <strong>Priority :</strong>

                <span class="priority ${task.priority.toLowerCase()}">

                    ${task.priority}

                </span>

            </p>

            <p><strong>Deadline :</strong> ${task.deadline}</p>

            <p>

                <strong>Status :</strong>

                ${task.completed ? "✅ Completed" : "⏳ Pending"}

            </p>

            ${
                task.completed
                ?
                `<button class="complete-btn" disabled>
                    ✅ Completed
                </button>`
                :
                `<button class="complete-btn"
                    onclick="completeTask(${originalIndex})">
                    ✔ Complete
                </button>`
            }

            <button
                class="delete-btn"
                onclick="deleteTask(${originalIndex})">

                Delete

            </button>

        </div>

        `;

    });

    // Progress

    document.getElementById("totalCount").innerText = tasks.length;
    document.getElementById("completedCount").innerText = completed;

    let percent = 0;

    if (tasks.length > 0) {

        percent = (completed / tasks.length) * 100;

    }

    document.getElementById("progressFill").style.width = percent + "%";

}

// ===============================
// Add Task
// ===============================

addTaskBtn.addEventListener("click", function () {

    const subject = document.getElementById("subject").value.trim();
    const unit = document.getElementById("unit").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    if (
        subject === "" ||
        unit === "" ||
        topic === "" ||
        deadline === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    const newTask = {

        subject: subject,
        unit: unit,
        topic: topic,
        priority: priority,
        deadline: deadline,
        completed: false

    };

    tasks.push(newTask);

    saveData("studyTasks", tasks, user);

    document.getElementById("subject").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("deadline").value = "";

    displayTasks();

});

// ===============================
// Delete Task
// ===============================

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveData("studyTasks", tasks, user);

        displayTasks();

    }

}

// ===============================
// Complete Task
// ===============================

function completeTask(index) {

    tasks[index].completed = true;

    saveData("studyTasks", tasks, user);

    displayTasks();

}

// ===============================
// Search
// ===============================

searchInput.addEventListener("keyup", displayTasks);

// ===============================
// Filter
// ===============================

filterStatus.addEventListener("change", displayTasks);

// ===============================
// Sort
// ===============================

sortDeadline.addEventListener("change", displayTasks);

// ===============================
// Initial Load
// ===============================

displayTasks();