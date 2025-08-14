document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Function to create confetti
    function createConfetti() {
        // Clear any existing confetti
        confettiContainer.innerHTML = '';
        
        // Create 100 pieces of confetti
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position
            const posX = Math.random() * 100;
            const rotation = Math.random() * 360;
            const size = Math.random() * 10 + 5;
            const duration = Math.random() * 2 + 2;
            
            // Random shape (square or circle)
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            // Apply random styles
            confetti.style.left = `${posX}%`;
            confetti.style.top = '-10px';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            
            // Random horizontal movement
            const moveX = (Math.random() - 0.5) * 200;
            confetti.style.setProperty('--move-x', `${moveX}px`);
            
            // Add to container
            confettiContainer.appendChild(confetti);
        }
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name === '') {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Name is required';
            return false;
        } else if (name.length < 2) {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Name must be at least 2 characters long';
            return false;
        } else if (/[^a-zA-Z\s]/.test(name)) {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Name can only contain letters and spaces';
            return false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.textContent = '';
            return true;
        }
    }

    // Validate email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        
        if (email === '') {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(email)) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailInput.classList.remove('invalid');
            emailError.textContent = '';
            return true;
        }
    }

    // Validate message
    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (message === '') {
            messageInput.classList.add('invalid');
            messageError.textContent = 'Message is required';
            return false;
        } else if (message.length < 10) {
            messageInput.classList.add('invalid');
            messageError.textContent = 'Message must be at least 10 characters long';
            return false;
        } else {
            messageInput.classList.remove('invalid');
            messageError.textContent = '';
            return true;
        }
    }

    // Event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Reset any previous animations
            successMessage.classList.remove('show');
            
            // Force reflow to reset animation
            void successMessage.offsetWidth;
            
            // Show success message with animation
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.display = 'block';
            
            // Trigger the animation and confetti
            setTimeout(() => {
                successMessage.classList.add('show');
                createConfetti(); // Trigger confetti explosion
            }, 10);
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds with animation
            setTimeout(() => {
                successMessage.classList.remove('show');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 500);
            }, 5000);
        }
    });
});
