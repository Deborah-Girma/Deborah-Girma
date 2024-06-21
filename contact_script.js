const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitButton = document.querySelector('.rounded-form button');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let isValid = true;
    formMessage.innerHTML = '';

    if (nameInput.value.trim() === '') {
        isValid = false;
        nameInput.classList.add('error');
        formMessage.innerHTML += '<p>Please enter your name.</p>';
    } else {
        nameInput.classList.remove('error');
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
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const serviceId = 'service_0rmy90p'; // Replace with your EmailJS service ID
        const templateId = 'template_qy3zev9'; // Replace with your EmailJS template ID
        const publicKey = 'Lz6kSoOMC0FvqH2aZ'; // Replace with your EmailJS public key

        emailjs.init(publicKey);

        const formData = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message_html: messageInput.value
        };

        const response = await emailjs.send(serviceId, templateId, formData);

        console.log('Email sent response:', response);

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
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
