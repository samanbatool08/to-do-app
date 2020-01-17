document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("form")
    const taskUl = document.getElementById("task-list")
    const showPanel = document.getElementById("show-panel")

    form.addEventListener("submit", function(e) {
        e.preventDefault()

        let username = document.getElementById("username").value
        let taskname = document.getElementById("taskname").value
        let description = document.getElementById("task-desc").value

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
            // console.log(task)
            let li = document.createElement('li')
            li.dataset.id = task.id
            li.innerText = task.taskname
            taskUl.appendChild(li)
        }) // end of second .then
    }) // end of form event listener


    taskUl.addEventListener('click', function (e){
        let taskTitle = document.createElement('h1')
        let taskDesc = document.createElement('p')
        
        taskTitle.innerText = e.target.innerText
        // taskDesc.innerText = 
        if (showPanel.hasChildNodes) {
            showPanel.removeChild
        }
        showPanel.appendChild(taskTitle)


    })// ends event listeners for li


}) // end of main DOMContentLoaded function

