// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) return;

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters and spaces only, minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject must be at least 5 characters long'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        }
    };

    // Validate individual field
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!rules || !errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required && !fieldValue) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }
        // Pattern validation
        else if (rules.pattern && fieldValue && !rules.pattern.test(fieldValue)) {
            isValid = false;
            errorMessage = rules.message;
        }
        // Minimum length validation
        else if (rules.minLength && fieldValue && fieldValue.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message;
        }

        // Update UI
        if (isValid) {
            field.classList.remove('error');
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        } else {
            field.classList.add('error');
            errorElement.style.display = 'block';
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    // Validate entire form
    function validateForm() {
        const fields = contactForm.querySelectorAll('input, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    // Show form status message
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // Reset form
    function resetForm() {
        contactForm.reset();
        const errorElements = contactForm.querySelectorAll('.error-message');
        const fields = contactForm.querySelectorAll('input, textarea');
        
        errorElements.forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        fields.forEach(field => {
            field.classList.remove('error');
        });
        
        formStatus.style.display = 'none';
    }

    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showFormStatus('Please correct the errors above and try again.', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        showFormStatus('Sending your message...', 'info');

        try {
            // Get form action URL (this should be configured by the user)
            const actionUrl = contactForm.getAttribute('action');
            
            if (!actionUrl || actionUrl === '#') {
                throw new Error('Form action URL not configured. Please check the README for setup instructions.');
            }

            // Submit form
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                resetForm();
            } else {
                throw new Error('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus(error.message || 'Sorry, there was an error sending your message. Please try again or contact me directly via email.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    // Add event listeners
    contactForm.addEventListener('submit', handleFormSubmit);

    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => validateField(field));
        
        // Clear errors on input
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Add CSS for error states
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        
        .error-message {
            color: #dc2626;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .form-status.info {
            background: #dbeafe;
            color: #1e40af;
            border: 1px solid #93c5fd;
        }
    `;
    document.head.appendChild(style);

    // Accessibility improvements
    formFields.forEach(field => {
        const label = contactForm.querySelector(`label[for="${field.id}"]`);
        if (label && !field.getAttribute('aria-describedby')) {
            const errorId = `${field.name}-error`;
            field.setAttribute('aria-describedby', errorId);
        }
    });

    // Auto-resize textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});