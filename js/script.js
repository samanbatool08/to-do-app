document.addEventListener("DOMContentLoaded", function() {

        const form = document.getElementById("form")
        const taskUl = document.getElementById("task-list")
        const showPanel = document.getElementById("show-panel")

        form.addEventListener("submit", function(e) {
                e.preventDefault()
                

                let username = document.getElementById("username").value
                let taskname = document.getElementById("taskname").value
                let description = document.getElementById("task-desc").value

                function validateForm() {
                    if (username === "") {
                        alert("Username must be filled out");
                        return false
                        // e.target.reset()
                    }

                    if (taskname === ""){
                        alert("Task name must be filled out");
                        return false
                        // e.target.reset()
                    }

                    if (description === ""){
                        alert("Task description must be filled out");
                        return false
                        // e.target.reset()
                    }
                    else {
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
                                let li = document.createElement('li')
                                li.dataset.id = parseInt(task.id)
                                li.className = "task-li"
                                li.innerText = task.taskname
                                taskUl.appendChild(li)
                            }) // end of second .then
                        
                    }
                }

                validateForm()

                e.target.reset()

            }) // end of form event listener


        taskUl.addEventListener('click', function(e) {
                if (e.target.className === 'task-li') {
                    let id = parseInt(e.target.dataset.id)

                    console.log(typeof id)

                    fetch(`http://localhost:3000/tasks/${id}`)

                    .then(response => response.json())
                        .then(task => showTask(task))
                }


                function showTask(task) {
                    let taskDiv = document.createElement('div')
                    let taskTitle = document.createElement('h2')
                    let taskDesc = document.createElement('p')

                    taskTitle.innerText = task.taskname
                    taskDesc.innerText = task.description
                    showPanel.innerHTML = ""
                    taskDiv.appendChild(taskTitle)
                    taskDiv.appendChild(taskDesc)
                    showPanel.appendChild(taskDiv)

                } // ends showtask function
            }) // ends event listeners for li

        const loginBtn = document.getElementById("login-button")
        const modal = document.getElementById("myModal")
        const modalClose = document.getElementsByClassName("close")[0]


        loginBtn.onclick = function() {
                modal.style.display = "block";
            } // ends login button eventlistener

        modalClose.onclick = function() {
                modal.style.display = "none";
            } // ends modal close eventlistener


        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }) // end of main DOMContentLoaded function