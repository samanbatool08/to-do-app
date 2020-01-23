let currentUser = {}

document.addEventListener("DOMContentLoaded", function() {

        const form = document.getElementById("form")
        const taskUl = document.getElementById("task-list")
        const showPanel = document.getElementById("show-panel")

        form.addEventListener("submit", function(e) {
                e.preventDefault()

                let taskname = document.getElementById("taskname").value
                let description = document.getElementById("task-desc").value
                let username = currentUser.username

                function validateForm() {

                    if (taskname === "") {
                        alert("Task name must be filled out");
                        return false
                    }

                    if (description === "") {
                        alert("Task description must be filled out");
                        return false

                    } else {

                        let taskData = {
                                "username": username,
                                "taskname": taskname,
                                "description": description
                            }
                            // console.log(taskData)

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
                                renderTaskLi(task)
                            }) // end of second .then

                    } // ends else
                } // ends validate function

                validateForm()

                e.target.reset()

            }) // end of form event listener

        function renderTaskLi(task) {
            let li = document.createElement('li')
            li.dataset.id = parseInt(task.id)
            li.className = "task-li"
            li.innerText = task.taskname
            taskUl.appendChild(li)
        }


        taskUl.addEventListener('click', function(e) {
                if (e.target.className === 'task-li') {
                    let id = parseInt(e.target.dataset.id)

                    fetch(`http://localhost:3000/tasks/${id}`)

                    .then(response => response.json())
                        .then(task => showTask(task))
                }


                function showTask(task) {
                    let taskDiv = document.createElement('div')
                    let taskTitle = document.createElement('h2')
                    let taskDesc = document.createElement('p')
                    let deleteButton = document.createElement('button')
                    deleteButton.dataset.id = 'delete-btn'

                    taskTitle.innerText = task.taskname
                    taskDesc.innerText = task.description
                    deleteButton.innerText = "Delete"

                    showPanel.innerHTML = ""
                    taskDiv.appendChild(taskTitle)
                    taskDiv.appendChild(taskDesc)
                    taskDiv.appendChild(deleteButton)
                    showPanel.appendChild(taskDiv)

                } // ends showtask function
            }) // ends event listeners for li


        // let deleteButton = document.getElementById("delete-btn")

        // console.log(deleteButton)

        // deleteButton.addEventListener('click', function(e) {
        //     console.log(e.target)
        //     console.log("clicking delete button")
        // })

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

        let loginSubmit = document.getElementById("login-submit")
        loginSubmit.addEventListener('click', function(e) {
                e.preventDefault()
                modal.style.display = "none";

                let username = document.getElementById("username").value

                function validateUser() {
                    if (username === "") {
                        alert("Username must be filled out");
                        return false

                    } else {

                        loginBtn.innerText = `${username}, you can do it!`

                        let loginData = {
                            "username": username
                        }


                        fetch("http://localhost:3000/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    accept: "application/json"
                                },
                                body: JSON.stringify(loginData)
                            }) // ends fetch
                            .then(response => response.json())
                            .then(data => {
                                currentUser = data
                                userTasks(currentUser)
                            }) // ends second .then
                    } // ends else
                } // ends validate user function
                validateUser()
            }) // ending login eventlistener

        function userTasks(user) {
            let id = user.id

            fetch(`http://localhost:3000/users/${id}/tasks`)
                .then(response => response.json())
                .then(taskData => {
                    taskData.forEach(task => {
                            renderTaskLi(task)
                        }) //ends foreach

                }) //ends .then
        } //ends usertasks function














    }) // end of main DOMContentLoaded function