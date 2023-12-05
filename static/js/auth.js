import { show_alert } from "./utils.js";

var json_clients = [];

// check email and password when user submit
let login_form = document.querySelector("#login_form");
login_form.addEventListener(
    "submit", function(form_instance){
        // prefent default submit
        form_instance.preventDefault();

        // get user name and password values
        let email = document.getElementById("emailLogin").value;
        let password = document.getElementById("passwordLogin").value;

        // handle missing values
        if (email == "" || password == ""){
            show_alert("alert-danger", "Erro ao tentar logar. Faltando email ou senha");
            return;
        }

        // check if email and password are correct
        for (let client of json_clients){
            console.log(client);
            if (client.email == email && client.password == password) {
                // create session
                window.sessionStorage.setItem("email", client.email);
                window.sessionStorage.setItem("email", client.name);
                window.sessionStorage.setItem("email", client.password);

                window.location.href = "http://127.0.0.1:5500/task_list.html";
                window.onload = function(){
                    document.sessionStorage.getItem("email").value;
                    document.sessionStorage.getItem("name").value;
                    document.sessionStorage.getItem("password").value;
                }
                return;
            }
        }

        // send alert
        show_alert("alert-danger", "Usuário não cadastrado");
    }
)

let register_form = document.querySelector("#register_form");

register_form.addEventListener(
    "submit", function(form_instance){
        // prevent default submit
        form_instance.preventDefault();

        // get user name, email and password values
        let name = document.getElementById("nameRegister").value;
        let email = document.getElementById("emailRegister").value;
        let password = document.getElementById("passwordRegister").value;

        // handle missing values
        if (name == "" || email == "" || password == ""){
            show_alert("alert-danger", "Erro ao tentar registrar. Faltando nome, email ou senha");
            return;
        }
        for (let client of json_clients){
            if (client.email == email) {
                // check if email is already registered
                show_alert("alert-danger", "Email já cadastrado");
                return;
            }
        }
        // create new_cliente instance
        let new_client = {
            "name": name,
            "email": email,
            "password": password
        }

        console.log(json_clients);
        // insert into 'database'
        json_clients.push(new_client);

        // send alert
        show_alert("alert-success", "Registrado com sucesso");
}) 