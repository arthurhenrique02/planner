export function show_alert(alert_type, alert_message){
    let alert = document.querySelector(".alert");
    // add an error alert
    alert.classList.add(alert_type);
    alert.innerText = alert_message
    alert.classList.remove("d-none");

    // add timer
    setTimeout(function() {
        // adds 'd-none' class after 5 secs
        document.querySelector(".alert").classList.add('d-none');
        }, 5000);
}