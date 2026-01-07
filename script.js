document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        hamburger.innerHTML = isVisible ? 
            '<i class="fas fa-bars"></i>' : 
            '<i class="fas fa-times"></i>';
        
        if (!isVisible) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navLinks.style.gap = '20px';
            navLinks.style.zIndex = '1000';
        }
    });
    
    // Financing Calculator
    const priceSlider = document.getElementById('priceSlider');
    const downSlider = document.getElementById('downSlider');
    const termSlider = document.getElementById('termSlider');
    const priceValue = document.getElementById('priceValue');
    const downValue = document.getElementById('downValue');
    const termValue = document.getElementById('termValue');
    const monthlyPayment = document.getElementById('monthlyPayment');
    
    function formatCurrency(value) {
        return '$' + value.toLocaleString();
    }
    
    function calculatePayment() {
        const price = parseInt(priceSlider.value);
        const down = parseInt(downSlider.value);
        const term = parseInt(termSlider.value);
        
        const loanAmount = price - down;
        const interestRate = 0.069; // 6.9%
        const monthlyRate = interestRate / 12;
        const payment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term) / 
                       (Math.pow(1 + monthlyRate, term) - 1);
        
        priceValue.textContent = formatCurrency(price);
        downValue.textContent = formatCurrency(down);
        termValue.textContent = term + ' months';
        monthlyPayment.textContent = formatCurrency(Math.round(payment));
    }
    
    [priceSlider, downSlider, termSlider].forEach(slider => {
        slider.addEventListener('input', calculatePayment);
    });
    
    calculatePayment(); // Initial calculation
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Search form submission
    const searchForm = document.querySelector('.search-filters');
    if (searchForm) {
        const searchBtn = searchForm.querySelector('button');
        searchBtn.addEventListener('click', function() {
            const make = searchForm.querySelector('select:nth-child(1)').value;
            const model = searchForm.querySelector('select:nth-child(2)').value;
            const year = searchForm.querySelector('select:nth-child(3)').value;
            
            alert(`Searching for ${year} ${make} ${model}...`);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
    
    // Vehicle card interactions
    const viewDetailBtns = document.querySelectorAll('.btn-outline');
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const vehicleName = this.closest('.vehicle-info').querySelector('h3').textContent;
            alert(`Loading details for ${vehicleName}...`);
        });
    });
    
    // Contact buttons
    const contactBtns = document.querySelectorAll('.cta-buttons .btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Book Test Drive')) {
                e.preventDefault();
                alert('Test drive booking form will open...');
            }
        });
    });
});
