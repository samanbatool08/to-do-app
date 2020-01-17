document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("form")

    form.addEventListener("submit", function(e) {
        e.preventDefault()

        let username = document.getElementById("username").value
        let taskname = document.getElementById("taskname").value
        let description = document.getElementById("task-desc").value
        let taskUl = document.getElementById("task-list")

        e.target.reset()

        let taskData = {
            "username": username,
            "taskname": taskname,
            "description": description
        }

        fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(taskData)
        }) // ends fetch
        .then(response => response.json())
        .then(task => {
            console.log(task)
            let li = document.createElement('li')
            li.dataset.id = task.id
            li.innerText = task.taskname
            taskUl.appendChild(li)
        }) // end of second .then
    }) // end of form event listener



}) // end of main DOMContentLoaded function

