// Main JavaScript for Physics Watercooler Website

document.addEventListener('DOMContentLoaded', function() {
    // Set last updated date
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        lastUpdatedElement.textContent = currentDate;
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for letter links
    document.querySelectorAll('.letter-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle loading effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add hover effects for term cards
    document.querySelectorAll('.term-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.term-card, .instruction-card, .term-entry').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add search functionality (basic)
    function addSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const termEntries = document.querySelectorAll('.term-entry');
                
                termEntries.forEach(entry => {
                    const title = entry.querySelector('h2').textContent.toLowerCase();
                    const content = entry.textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        entry.style.display = 'block';
                    } else {
                        entry.style.display = 'none';
                    }
                });
            });
        }
    }

    addSearchFunctionality();

    // Add keyboard navigation for alphabet grid
    document.querySelectorAll('.letter-link').forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            const links = document.querySelectorAll('.letter-link');
            let newIndex = index;
            
            switch(e.key) {
                case 'ArrowRight':
                    newIndex = (index + 1) % links.length;
                    break;
                case 'ArrowLeft':
                    newIndex = (index - 1 + links.length) % links.length;
                    break;
                case 'ArrowDown':
                    newIndex = Math.min(index + 6, links.length - 1);
                    break;
                case 'ArrowUp':
                    newIndex = Math.max(index - 6, 0);
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            links[newIndex].focus();
        });
    });

    // Add copy link functionality for terms
    document.querySelectorAll('.term-entry h2').forEach(heading => {
        heading.style.cursor = 'pointer';
        heading.title = 'Click to copy link to this term';
        
        heading.addEventListener('click', function() {
            const termId = this.textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const url = window.location.href.split('#')[0] + '#' + termId;
            
            navigator.clipboard.writeText(url).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = '📋 Link copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1500);
            });
        });
    });
});

// Utility function to highlight search terms
function highlightSearchTerm(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Function to update term content (for future updates)
function updateTermContent(termId, newContent) {
    const termElement = document.getElementById(termId);
    if (termElement) {
        termElement.innerHTML = newContent;
        // Trigger re-observation for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        observer.observe(termElement);
    }
}

// Export functions for potential future use
window.PhysicsWatercooler = {
    updateTermContent,
    highlightSearchTerm
};

