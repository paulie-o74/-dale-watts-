

function sendMail() {
var tempParams = {
    from_name: document.getElementById("fromName").value,
    to_name: document.getElementById("email_address").value,
    message: document.getElementById("msg").value,
};
    emailjs.send('service_zgolv4m', 'template_54vj3xp', tempParams)
    .then(function(res){
        console.log("success", res.status);
    })
}