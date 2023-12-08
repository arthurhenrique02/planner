import {logout, show_alert} from "./utils.js";

// get current date
var datetime = new Date();

// get greeting
window.onload = function(){
    let greeting = '';
    // check if it's morning, afternoon or night
    if (datetime.getHours() < 12) {
        greeting = "Bom dia";
    }
    else if (datetime.getHours() < 18) {
        greeting = "Boa tarde";
    }
    else { 
        greeting = "Boa noite";
    }

    // update greeting
    document.querySelector(".greeting").innerHTML = `${greeting}, ${localStorage.getItem("name")}!`;
};

// logout user
let logout_span = document.getElementById("logout");
logout_span.addEventListener("click", function(){
    logout();
})

// tasks 'database'
var json_tasks = [];

// get form
let sbmt_task = document.getElementById("sbmt_task");

sbmt_task.addEventListener("submit", function(form_instance){
    // prevent default submit
    form_instance.preventDefault();

    // get task values
    let task = document.getElementById("taskName").value;
    let start_date = document.getElementById("startDate").value;
    let end_date = document.getElementById("endDate").value;
    let description = document.getElementById("description").value;
    let start_hour = document.getElementById("startHour").value;
    let end_hour = document.getElementById("endHour").value;

    // check if fields are empty
    if (task == "" || start_date == "" || end_date == "" || description == ""){
        show_alert("alert-danger", "Erro ao tentar criar tarefa. Faltando campos.");
        return;
    }

    // format dates
    start_date = start_date.split("-").reverse().join("/");
    end_date = end_date.split("-").reverse().join("/");
    // create task object
    let task_object = {
        "id": json_tasks.length + 1,
        "task": task,
        "start_date": `${start_date}`,
        "end_date": `${end_date}`,
        "start_hour": `${start_hour}`,
        "end_hour": `${end_hour}`,
        "description": description,
        "email": localStorage.getItem("email")
    }

    // add task to json_tasks
    json_tasks.push(task_object);

    // send alert
    show_alert("alert-success", "Tarefa registrada com sucesso!");

    // update session storage
    localStorage.setItem("tasks", JSON.stringify(json_tasks));

    update_tasks_table();
});

function update_tasks_table(){
    // Get the user email
    var userEmail = localStorage.getItem("email");

    // Filter tasks based on user email
    var userTasks = json_tasks.filter(function(task) {
        return task.email === userEmail;
    });

    // get table body
    var table_body = document.getElementById("taskTable").children[1];

    // get table body length
    let len_table_body = table_body.rows.length;

    // populate table body
    for (let i = userTasks.length; i > len_table_body; i--){
        // create row
        let row = table_body.insertRow(-1);
        row.addClass = "row";

        // create cells
        let task_cell = row.insertCell(0);
        let start_cell = row.insertCell(1);
        let end_cell = row.insertCell(2);
        let description_cell = row.insertCell(3);
        let status = row.insertCell(4);
        let change_btn = row.insertCell(5);

        // add task text to task cell
        task_cell.innerText = userTasks[i-1]["task"];

        // add start text to start cell
        start_cell.innerText = `${userTasks[i-1]["start_date"]} às ${userTasks[i-1]["start_hour"]}`;
        
        // add end text to end cell
        end_cell.innerText = `${userTasks[i-1]["end_date"]} às ${userTasks[i-1]["end_hour"]}`;

        // add description text to description cell
        description_cell.innerText = userTasks[i-1]["description"];

        // add status text to status cell   
        status.innerText = "Em andamento";

        // add change button to change cell
        change_btn.innerHTML = `<button type="button" id="${userTasks[i-1]['id']}" class="btn">Alterar</button>`;
    }
}

// create status changer (change every 10 secs)
setInterval(function(){
    // get current time
    let time = new Date();
    // get table body
    var table_body = document.getElementById("taskTable").children[1];

    // loop through table body
    for (let i = 0; i < table_body.rows.length; i++){
        // get task id
        let task_id = table_body.rows[i].cells[5].children[0].id;

        json_tasks.find(function(task){
            if (task.id == task_id){
                // get start date
                let start_date = new Date(`${task.start_date.split("/").reverse().join("-")} ${task.start_hour}`);
                // get end date
                let end_date = new Date(`${task.end_date.split("/").reverse().join("-")} ${task.end_hour}`);

                // // check if start date is before current time and end date is after current time
                if (start_date > time && table_body.rows[i].cells[4].innerText != "Finalizada"){
                    table_body.rows[i].cells[4].innerText = "Pendente";
                }
                else if (start_date <= time && end_date >= time && table_body.rows[i].cells[4].innerText != "Finalizada"){
                    table_body.rows[i].cells[4].innerText = "Em andamento";
                }
                else if (end_date < time && table_body.rows[i].cells[4].innerText != "Finalizada"){
                    table_body.rows[i].cells[4].innerText = "Em atraso";
                }
            }
        });
    }
}, 10000);