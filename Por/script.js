// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();
    
    // Better error messages
    if (name.length < 2) {
        showError('Please enter your full name (at least 2 characters)');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address (example@domain.com)');
        return;
    }
    
    if (message.length < 10) {
        showError('Please enter a detailed message (at least 10 characters)');
        return;
    }
    
    // Success handling
    showSuccess('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (window.scrollY > 50) {
        navbar.style.background = isDarkMode ? 
            'rgba(45, 45, 45, 0.98)' : 
            'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = isDarkMode ? 
            'rgba(45, 45, 45, 0.95)' : 
            'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Add dark mode functionality
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
document.querySelector('.navbar').appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const navbar = document.querySelector('.navbar');
    
    // Update navbar background based on scroll position and dark mode
    if (window.scrollY > 50) {
        navbar.style.background = isDarkMode ? 
            'rgba(45, 45, 45, 0.98)' : 
            'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = isDarkMode ? 
            'rgba(45, 45, 45, 0.95)' : 
            'rgba(255, 255, 255, 0.95)';
    }
    
    darkModeToggle.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    
    // Reset and re-trigger skill animations
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0';
        bar.classList.remove('animate-skill');
    });
    setTimeout(observeSkills, 100);
});

// Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / height) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading Animation
const loader = document.querySelector('.loader');
if (loader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1000);
    });
}

// Add Intersection Observer for skill bars animation
const observeSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const options = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.parentElement.previousElementSibling
                    .querySelector('.skill-number').textContent;
                
                // Animate the skill bar to its percentage
                skillBar.style.width = percentage;
                
                // Add a class for smooth animation
                skillBar.classList.add('animate-skill');
                
                // Stop observing after animation
                observer.unobserve(skillBar);
            }
        });
    }, options);

    // Observe each skill bar
    skillBars.forEach(bar => skillObserver.observe(bar));
};

// Call the function when the page loads
window.addEventListener('load', observeSkills);

// Also trigger on dark mode toggle to ensure animations work in both modes
darkModeToggle.addEventListener('click', () => {
    // ... existing dark mode code ...
    
    // Reset and re-trigger skill animations
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0';
        bar.classList.remove('animate-skill');
    });
    setTimeout(observeSkills, 100);
});

// Add mobile menu functionality
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').insertBefore(hamburger, document.querySelector('.nav-menu'));

hamburger.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Close mobile menu when scrolling
window.addEventListener('scroll', () => {
    if(document.querySelector('.nav-menu').classList.contains('active')) {
        document.querySelector('.nav-menu').classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Add current year update
document.getElementById('current-year').textContent = new Date().getFullYear();

// Add error/success message handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => errorDiv.remove(), 3000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => successDiv.remove(), 3000);
}
// Remove welcome popup and simplify loader
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fade-out');
        // Show welcome popup after loader fades
        setTimeout(() => {
            document.getElementById('welcomePopup').classList.add('show');
        }, 500);
    }, 1000);
});

// Add popup close functionality
document.querySelector('.close-popup').addEventListener('click', function() {
    document.getElementById('welcomePopup').classList.remove('show');
});

// Add download confirmation functionality
const downloadBtn = document.querySelector('.download-btn');
const downloadConfirmPopup = document.getElementById('downloadConfirmPopup');
const confirmDownloadBtn = document.querySelector('.confirm-download');
const cancelDownloadBtn = document.querySelector('.cancel-download');

// Prevent default download behavior
downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    downloadConfirmPopup.classList.add('show');
});

// Handle download confirmation
confirmDownloadBtn.addEventListener('click', function() {
    downloadConfirmPopup.classList.remove('show');
    // Trigger the download
    const link = document.createElement('a');
    link.href = './Images/vj resume.pdf';
    link.download = 'Vijayaraj_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Handle download cancellation
cancelDownloadBtn.addEventListener('click', function() {
    downloadConfirmPopup.classList.remove('show');
});

// Close popup if clicked outside
downloadConfirmPopup.addEventListener('click', function(e) {
    if (e.target === downloadConfirmPopup) {
        downloadConfirmPopup.classList.remove('show');
    }
});
