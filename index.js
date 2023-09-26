function addtasklists() {
    const input = document.getElementById("add-task");
    const lists = document.getElementById("lists");

    if (input.value === "") {
        alert("Please add your task!");
    } else {
        const li = document.createElement("li");

        const dateTime = document.createElement("div");
        dateTime.textContent = getFormattedDateTime();
        dateTime.className = "date-time";

        const taskText = document.createElement("div");
        taskText.textContent = input.value;
        taskText.className = "task-text";

        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        const colors = ["#82e4ff", "#ee93ee", "#ffeb64", "#ff3354"];
        const line = document.createElement("div");
        line.className = "line";
        const colorIndex = lists.children.length % colors.length;
        line.style.backgroundColor = colors[colorIndex];

        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.className = "complete-button";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        buttonGroup.appendChild(completeButton);
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        taskContent.appendChild(line);
        taskContent.appendChild(taskText);

        li.appendChild(dateTime);
        li.appendChild(taskContent);
        li.appendChild(buttonGroup);
        lists.appendChild(li);
    }

    input.value = "";
    submit();
}

const lists = document.getElementById("lists");

lists.addEventListener("click", function (e) {
    if (e.target.classList.contains("complete-button")) {
        const listItem = e.target.closest("li");
        listItem.classList.toggle("checked-item");
        submit();
    } else if (e.target.classList.contains("edit-button")) {
        const listItem = e.target.closest("li");
        const taskText = listItem.querySelector(".task-text");
        const updatedTask = prompt("Edit task:", taskText.textContent);
        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskText.textContent = updatedTask;
            submit();
        }
    } else if (e.target.classList.contains("delete-button")) {
        e.target.closest("li").remove();
        submit();
    }
}, false);

function getFormattedDateTime() {
    const now = new Date();
    const options = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

// Function to save the list data to localStorage
const submit = () => localStorage.setItem("data", lists.innerHTML);

// Function to display the saved list data from localStorage
const showLists = () => lists.innerHTML = localStorage.getItem("data");

showLists(); // Call the showLists function to load the list data from localStorage


