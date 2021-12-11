// via emailjs

//DOM queering 
const quizContainer = document.getElementById('form');
const container2 = document.getElementById('success');


function sendMail(params) {
    var tempParams = {
        // paramaters from the DOM
        from_name: document.getElementById("fromName").value,
        to_name: document.getElementById("email_address").value,
        message: document.getElementById("msg").value,
    };
    // service ID, template ID, and params object from above
    emailjs.send('service_zgolv4m', 'template_54vj3xp', tempParams)
        .then(function (res) {
            console.log("success", res.status);
        });
}


//show success message after submitting form via emailJS
var a;

function successMessage() {
    if (a == 1) {} else {
        document.getElementById("success").classList.remove("hide");
        document.getElementById("form").classList.add("hide");
        return a = 1;
    }
}