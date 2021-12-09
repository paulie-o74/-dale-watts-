const quizContainer = document.getElementById('form');
const container2 = document.getElementById('success');


function sendMail(params) {
    var tempParams = {
        from_name: document.getElementById("fromName").value,
        to_name: document.getElementById("email_address").value,
        message: document.getElementById("msg").value,
    };
    emailjs.send('service_zgolv4m', 'template_54vj3xp', tempParams)
        .then(function (res) {
            console.log("success", res.status);
        });
};



var a;

function successMessage() {
    if (a == 1) {} else {
        document.getElementById("success").classList.remove("hide");
        document.getElementById("form").classList.add("hide");
        return a = 1;
    };
};