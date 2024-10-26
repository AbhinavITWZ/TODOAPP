let addbtn = document.querySelector("#add-task");
let input = document.querySelector("#task-input");
let taskcnt = document.querySelector(".task-list");

// Load tasks from localStorage when the page loads
window.onload = () => {
    let work = JSON.parse(localStorage.getItem("work")) || []; // Load tasks or initialize as empty array
    work.forEach(task => {
        addElement(task.text, task.checked); // Pass text and checked state
    });
};

function addElement(item, isChecked = false) {
    // Create list item elements
    let itemcheck = document.createElement("span");
    itemcheck.innerText = item;

    let list = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked; // Set checked state from parameter

    let btn = document.createElement("button");
    btn.id = "closeButton";
    btn.classList.add("close-btn");
    btn.innerHTML = `&times;`;

    // Append the checkbox, item text, and button to the list
    list.append(checkbox, itemcheck, btn);
    taskcnt.appendChild(list);

    // Checkbox state handling
    checkbox.addEventListener("change", () => {
        itemcheck.style.textDecoration = checkbox.checked ? "line-through" : "none";
        updateLocalStorage(); // Update storage when checked status changes
    });

    // Set initial text decoration based on checked state
    itemcheck.style.textDecoration = isChecked ? "line-through" : "none";

    // Delete button functionality
    btn.addEventListener("click", () => {
        list.remove();
        updateLocalStorage(); // Update storage when item is deleted
    });

    input.value = ""; // Clear input field
    updateLocalStorage(); // Update storage after adding new task
}

function updateLocalStorage() {
    // Collect tasks and store them in localStorage
    let tasks = [];
    document.querySelectorAll(".task-list li").forEach(listItem => {
        const text = listItem.querySelector("span").innerText;
        const checked = listItem.querySelector("input[type='checkbox']").checked;
        tasks.push({ text, checked }); // Store both text and checked status
    });
    localStorage.setItem("work", JSON.stringify(tasks));
}

// Add new task on button click
addbtn.addEventListener("click", () => {
    let val = input.value.trim(); // Trim whitespace
    if (val) {
        addElement(val); // Add new task
    } else {
        input.placeholder = "Please enter a task !!"; // Show placeholder if input is empty
    }
});
