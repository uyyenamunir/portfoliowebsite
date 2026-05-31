// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible && !bar.style.width) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

window.addEventListener('scroll', animateSkills);
animateSkills();

// Calculator functionality
let currentInput = '0';
let previousInput = '';
let operation = null;
const screen = document.getElementById('calc-screen');

function updateScreen() {
    if (screen) screen.value = currentInput;
}

function handleNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateScreen();
}

function handleOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    currentInput = '0';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(curr)) return;
    
    switch (operation) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr !== 0 ? prev / curr : 'Error'; break;
        default: return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateScreen();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateScreen();
}

function deleteLast() {
    if (currentInput.length === 1 || currentInput === '0') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateScreen();
}

// Attach calculator event listeners
document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.hasAttribute('data-num')) {
            handleNumber(btn.getAttribute('data-num'));
        } else if (btn.hasAttribute('data-op')) {
            handleOperator(btn.getAttribute('data-op'));
        } else if (btn.getAttribute('data-action') === 'clear') {
            clearAll();
        } else if (btn.getAttribute('data-action') === 'delete') {
            deleteLast();
        } else if (btn.getAttribute('data-action') === 'equals') {
            calculate();
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value || '';
        const email = document.getElementById('contactEmail')?.value || '';
        const message = document.getElementById('contactMessage')?.value || '';
        
        if (name && email && message) {
            alert(`Thank you ${name}! Your message has been sent. I will get back to you soon.`);
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Smooth scroll for "Try Calculator" button
const tryCalculatorBtn = document.getElementById('tryCalculatorBtn');
if (tryCalculatorBtn) {
    tryCalculatorBtn.addEventListener('click', () => {
        const calculatorWidget = document.getElementById('calculator-widget');
        if (calculatorWidget) {
            calculatorWidget.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Contact button scroll
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Handle all smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && href !== '#home' && href !== '#about' && href !== '#skills' && href !== '#projects' && href !== '#contact') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});