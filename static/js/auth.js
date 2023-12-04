import { show_alert } from "./utils.js";

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

        // make request to the clients 'database'
        fetch("/static/json/clients.json")
        .then((response)=> response.json())
        .then((json) => {
            for (let client of json){
                if (client.email == email && client.password == password) {
                    // TODO:
                    // validate and create session
                }
            }
        }).catch((error) =>{
            console.log("Usu[ario não encontrado ou não cadastrado");
        }
        );
    }
)