const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitButton = document.querySelector('.contact-form button'); // More specific selector

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Input validation (enhanced)
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let isValid = true;
    formMessage.innerHTML = ''; // Clear previous messages

    if (nameInput.value.trim() === '') {
        isValid = false;
        nameInput.classList.add('error'); // Add error class for styling (CSS needed)
        formMessage.innerHTML += '<p>Please enter your name.</p>';
    } else {
        nameInput.classList.remove('error'); // Remove error class if corrected
    }

    if (!validateEmail(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('error');
        formMessage.innerHTML += '<p>Please enter a valid email address.</p>';
    } else {
        emailInput.classList.remove('error');
    }

    if (messageInput.value.trim() === '') {
        isValid = false;
        messageInput.classList.add('error');
        formMessage.innerHTML += '<p>Please enter your message.</p>';
    } else {
        messageInput.classList.remove('error');
    }

    if (!isValid) {
        return; // Prevent form submission if validation fails
    }

    submitButton.disabled = true; // Disable button to prevent multiple submissions
    submitButton.textContent = 'Sending...'; // Update button text

    try {
        const serviceId = 'your_service_id'; // Replace with your EmailJS service ID
        const templateId = 'your_template_id'; // Replace with your EmailJS template ID
        const publicKey = 'your_public_key'; // Replace with your EmailJS public key

        emailjs.init(publicKey);

        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const response = await emailjs.send(serviceId, templateId, formData);

        if (response.status === 200) {
            formMessage.innerHTML = 'Message sent successfully!';
            form.reset();
        } else {
            throw new Error('Email sending failed with status: ' + response.status);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        formMessage.innerHTML = 'There was an error sending your message. Please try again later.';
    } finally {
        submitButton.disabled = false; // Re-enable button
        submitButton.textContent = 'Send Message'; // Restore button text
    }
});

// Email validation function (optional, can be improved)
function validateEmail(email) {
    const re = /^(([^<>()[\\]\\\\.,;:\s@"]+(\.[^<>()[\\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
