// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContestFilters();
    initWinnerCategories();
    initLotteryNumberChecker();
    initAnimations();
    initCarousel();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Scroll effects
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        // Show/hide scroll to top button
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Header transparency effect
        const header = document.querySelector('.header');
        if (window.pageYOffset > 100) {
            header.style.background = 'rgba(26, 13, 62, 0.98)';
        } else {
            header.style.background = 'rgba(26, 13, 62, 0.95)';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contest filters functionality
function initContestFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const contestCards = document.querySelectorAll('.contest-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter animation
            contestCards.forEach(card => {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 200);
            });
        });
    });
}

// Winner categories functionality
function initWinnerCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active category button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Animate winner cards
            const winnerCards = document.querySelectorAll('.winner-card');
            winnerCards.forEach((card, index) => {
                card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
            });
        });
    });
}

// Lottery number checker functionality
function initLotteryNumberChecker() {
    const numberInputs = document.querySelectorAll('.number-input');
    const checkButton = document.querySelector('.check-numbers-btn');
    const contestInput = document.querySelector('.contest-input');
    
    // Auto-focus next input when number is entered
    numberInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 2 && index < numberInputs.length - 1) {
                numberInputs[index + 1].focus();
            }
        });
        
        // Limit to 2 digits
        input.addEventListener('keypress', function(e) {
            if (this.value.length >= 2) {
                e.preventDefault();
            }
        });
    });
    
    // Check numbers functionality
    checkButton.addEventListener('click', function() {
        const contestNo = contestInput.value;
        const numbers = Array.from(numberInputs).map(input => input.value);
        
        if (!contestNo) {
            showNotification('Please enter a contest number', 'error');
            return;
        }
        
        if (numbers.some(num => num === '')) {
            showNotification('Please fill in all lottery numbers', 'error');
            return;
        }
        
        // Simulate checking (in real app, this would be an API call)
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        this.disabled = true;
        
        setTimeout(() => {
            const isWinner = Math.random() > 0.9; // 10% chance of winning
            if (isWinner) {
                showNotification('Congratulations! You are a winner!', 'success');
            } else {
                showNotification('Sorry, no winning numbers found. Try again!', 'info');
            }
            
            this.innerHTML = 'CHECK MY NUMBERS';
            this.disabled = false;
        }, 2000);
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.step, .contest-card, .stat-card, .support-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .step, .contest-card, .stat-card, .support-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .contest-card:hover {
            animation: pulse 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Carousel functionality for winners
function initCarousel() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const winnerShowcase = document.querySelector('.winner-showcase');
    
    let currentWinner = 0;
    const winners = [
        {
            name: 'John Smith',
            car: 'The Breeze Zodiac',
            date: '19/04/2023',
            image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop&crop=center',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        {
            name: 'Sarah Johnson',
            car: 'The Del Sol Trailblazer',
            date: '15/04/2023',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&crop=center',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face'
        },
        {
            name: 'Mike Wilson',
            car: 'The Miata Dart IV',
            date: '12/04/2023',
            image: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop&crop=center',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
    ];
    
    function updateWinnerDisplay() {
        const winner = winners[currentWinner];
        const carImg = winnerShowcase.querySelector('.winner-car img');
        const avatarImg = winnerShowcase.querySelector('.winner-avatar img');
        const badge = winnerShowcase.querySelector('.winner-badge');
        const dateElement = winnerShowcase.querySelector('.draw-date strong');
        
        // Fade out
        winnerShowcase.style.opacity = '0.5';
        
        setTimeout(() => {
            carImg.src = winner.image;
            avatarImg.src = winner.avatar;
            badge.textContent = winner.car;
            dateElement.textContent = winner.date;
            
            // Fade in
            winnerShowcase.style.opacity = '1';
        }, 300);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentWinner = (currentWinner - 1 + winners.length) % winners.length;
            updateWinnerDisplay();
        });
        
        nextBtn.addEventListener('click', function() {
            currentWinner = (currentWinner + 1) % winners.length;
            updateWinnerDisplay();
        });
    }
    
    // Auto-play carousel
    setInterval(() => {
        currentWinner = (currentWinner + 1) % winners.length;
        updateWinnerDisplay();
    }, 5000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add CSS for notifications
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 120px;
                right: 30px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                min-width: 300px;
            }
            
            .notification-success { background: linear-gradient(135deg, #4ade80, #22c55e); }
            .notification-error { background: linear-gradient(135deg, #ef4444, #dc2626); }
            .notification-info { background: linear-gradient(135deg, #3b82f6, #2563eb); }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

// Form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Subscribe form
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value;
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('Successfully subscribed to newsletter!', 'success');
                emailInput.value = '';
                this.innerHTML = 'Subscribe';
                this.disabled = false;
            }, 1500);
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
    
    // Contact buttons
    document.querySelectorAll('.call-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Calling customer support...', 'info');
        });
    });
    
    document.querySelectorAll('.email-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Opening email client...', 'info');
        });
    });
    
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Redirecting to FAQ section...', 'info');
        });
    });
});

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Buy tickets functionality
document.addEventListener('DOMContentLoaded', function() {
    const buyTicketsBtn = document.querySelector('.buy-tickets-btn');
    const participateBtn = document.querySelector('.participate-btn');
    
    [buyTicketsBtn, participateBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showNotification('Redirecting to ticket purchase...', 'info');
                // In a real application, this would redirect to the payment page
                setTimeout(() => {
                    const contestSection = document.getElementById('contest');
                    if (contestSection) {
                        contestSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1000);
            });
        }
    });
});

// Contest card interactions
document.addEventListener('DOMContentLoaded', function() {
    const contestCards = document.querySelectorAll('.contest-card');
    
    contestCards.forEach(card => {
        card.addEventListener('click', function() {
            const contestName = this.querySelector('h3').textContent;
            const contestNumber = this.querySelector('.contest-number').textContent;
            
            showNotification(`Selected: ${contestName} (${contestNumber})`, 'info');
            
            // Add selected effect
            contestCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add CSS for selected contest cards
const cardStyles = document.createElement('style');
cardStyles.textContent = `
    .contest-card.selected {
        border: 2px solid #ff6b9d;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
    }
    
    .contest-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
`;
document.head.appendChild(cardStyles);

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/\D/g, ''));
        
        let current = 0;
        const increment = numericValue / 100;
        
        const updateCounter = () => {
            if (current < numericValue) {
                current += increment;
                let displayValue = Math.ceil(current);
                
                if (isPercentage) {
                    counter.textContent = displayValue + '%';
                } else if (isPlus) {
                    counter.textContent = displayValue + '+';
                } else {
                    counter.textContent = displayValue;
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target; // Ensure we end with the exact target
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Mobile menu functionality (for responsive design)
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle if screen is small
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            const navbar = document.querySelector('.navbar');
            const navMenu = document.querySelector('.nav-menu');
            
            if (!document.querySelector('.mobile-menu-toggle')) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-menu-toggle';
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileToggle.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    display: none;
                `;
                
                if (window.innerWidth <= 768) {
                    mobileToggle.style.display = 'block';
                }
                
                navbar.insertBefore(mobileToggle, navMenu);
                
                mobileToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('mobile-active');
                });
            }
        }
    }
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 13, 62, 0.98);
            flex-direction: column;
            padding: 20px;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .nav-menu.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-toggle {
            display: block !important;
        }
    }
`;
document.head.appendChild(mobileStyles);