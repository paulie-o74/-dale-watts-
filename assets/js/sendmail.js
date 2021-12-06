/**
 * [sendEmail to send email using EmailJS
 * Credit: Code Institute material "Sending Emails Using EmailJS"]
 * The API that is used is described here: https://www.emailjs.com/
 * @param contactForm [The contact form object]
 */
 function sendMail(contactForm) {
    emailjs.init("");
    emailjs.send("gmail", "dale", {
        "from_name": contactForm.full_name.value,
        "from_email": contactForm.email_address.value
    }).then(
        function (response) {
            // Success sending email
        },
        function (error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}

// When the modal form has been submitted, hide the modal
$("#mailinglistform").on("submit", function () {
    $("#mailingListModal").modal("hide");
});