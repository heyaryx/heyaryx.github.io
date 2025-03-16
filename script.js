document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
            this.style.boxShadow = '12px 12px 0 #111111';
            
            
            this.animate([
                { transform: 'rotate(-2deg) translateY(-10px)' },
                { transform: 'rotate(-1deg) translateY(-8px)' },
                { transform: 'rotate(-2deg) translateY(-10px)' }
            ], {
                duration: 1200,
                iterations: 1
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '8px 8px 0 #111111';
        });
    });
    
    
    const skillCategories = document.querySelectorAll('.skill-category');
    
    
    skillCategories.forEach(category => {
        category.style.opacity = 1;
        category.style.transform = 'rotate(-1deg) translateY(0)';
        category.style.transition = 'all 0.5s ease';
    });
    
    
    function checkScroll() {
        
        skillCategories.forEach(category => {
            category.style.opacity = 1;
            category.style.transform = 'rotate(-1deg) translateY(0)';
        });
    }
    
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
    
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, 50);
    
    function adjustForDeviceSize() {
        const iconBar = document.querySelector('.icon-bar');
        const buttons = document.querySelectorAll('.button');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        
        const icons = document.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.style.zIndex = '100';
        });
        
        
        const emailIcon = document.querySelector('a[href^="mailto"] svg path');
        if (emailIcon) {
            emailIcon.setAttribute('d', 'M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z');
        }
        
        
        const githubIcon = document.querySelector('a[href*="github.com"] svg path');
        if (githubIcon) {
            githubIcon.setAttribute('d', 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z');
        }
        
        
        skillCategories.forEach(category => {
            category.style.opacity = '1';
            category.style.transform = 'rotate(-1deg) translateY(0)';
        });
        
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(-10deg)';
                this.style.boxShadow = '5px 5px 0 #111111';
                this.style.zIndex = '100';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0deg)';
                this.style.boxShadow = '3px 3px 0 #111111';
            });
        });
        
        
        if (window.innerWidth <= 767) { 
            iconBar.style.position = 'relative';
            iconBar.style.bottom = 'auto';
            iconBar.style.left = 'auto';
            iconBar.style.transform = 'none';
            iconBar.style.marginTop = '3rem';
            iconBar.style.marginBottom = '2rem';
            iconBar.style.justifyContent = 'center';
            
            
            buttons.forEach(btn => {
                if (btn.classList.contains('primary-button') || btn.classList.contains('secondary-button')) {
                    btn.style.margin = '0 auto 1rem auto';
                    btn.style.display = 'block';
                    btn.style.textAlign = 'center';
                }
            });
        } 
        else if (window.innerWidth <= 1024) { 
            iconBar.style.position = 'relative';
            iconBar.style.bottom = 'auto';
            iconBar.style.left = 'auto';
            iconBar.style.transform = 'none';
            iconBar.style.marginTop = '3rem';
            iconBar.style.marginBottom = '2rem';
            iconBar.style.justifyContent = 'center';
            
            
            buttons.forEach(btn => {
                if (btn.classList.contains('primary-button') || btn.classList.contains('secondary-button')) {
                    btn.style.marginBottom = '0';
                }
            });
        }
        else { 
            iconBar.style.position = 'absolute';
            iconBar.style.bottom = '2rem';
            iconBar.style.left = '50%';
            iconBar.style.transform = 'translateX(-50%)';
            iconBar.style.marginTop = '0';
            
            
            buttons.forEach(btn => {
                if (btn.classList.contains('primary-button') || btn.classList.contains('secondary-button')) {
                    btn.style.margin = '0';
                    btn.style.marginRight = '1.5rem';
                }
            });
        }
    }
    
    
    window.addEventListener('load', adjustForDeviceSize);
    window.addEventListener('resize', adjustForDeviceSize);

    
    const iconsHover = document.querySelectorAll('.icon');
    iconsHover.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(-10deg)';
            this.style.boxShadow = '5px 5px 0 #111111';
            this.style.zIndex = '100';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg)';
            this.style.boxShadow = '3px 3px 0 #111111';
        });
    });

    
    const adjustIcons = () => {
        const iconBar = document.querySelector('.icon-bar');
        if (window.innerWidth <= 767) {
            iconBar.style.position = 'relative';
            iconBar.style.bottom = 'auto';
            iconBar.style.left = 'auto';
            iconBar.style.transform = 'none';
        } else {
            iconBar.style.position = 'absolute';
            iconBar.style.bottom = '2rem';
            iconBar.style.left = '50%';
            iconBar.style.transform = 'translateX(-50%)';
        }
    };
    
    window.addEventListener('resize', adjustIcons);
    adjustIcons();
    
    
    const balanceSections = () => {
        
    };
    
    
    window.addEventListener('resize', balanceSections);
    setTimeout(balanceSections, 500);
    
    
    const fixIconsPosition = () => {
        const iconBar = document.querySelector('.icon-bar');
        if (window.innerWidth <= 767) {
            iconBar.style.position = 'relative';
            iconBar.style.bottom = 'auto';
            iconBar.style.left = 'auto';
            iconBar.style.transform = 'none';
        } else {
            iconBar.style.position = 'absolute';
            iconBar.style.bottom = '2rem';
            iconBar.style.left = '50%';
            iconBar.style.transform = 'translateX(-50%)';
        }
    };
    window.addEventListener('resize', fixIconsPosition);
    fixIconsPosition();
    
    
    const icons = document.querySelectorAll('.social-icon svg');
    icons.forEach(icon => {
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.minWidth = '20px';
        icon.style.overflow = 'visible';
    });
    
    
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.style.marginBottom = '0.5rem';
        
        
        button.addEventListener('mouseenter', function() {
            this.animate([
                { transform: 'rotate(-1deg) translateY(0)' },
                { transform: 'rotate(-1deg) translateY(-3px)' }
            ], {
                duration: 300,
                iterations: 1,
                fill: 'forwards'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            this.getAnimations().forEach(anim => anim.cancel());
            this.style.transform = 'rotate(-1deg)';
        });
    });
    
    
    const fixSocialIcons = () => {
        
        const githubIcon = document.querySelector('a[href*="github.com"] svg path');
        if (githubIcon) {
            githubIcon.setAttribute('d', 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z');
        }
        
        
        const emailIcon = document.querySelector('a[href^="mailto"] svg path');
        if (emailIcon) {
            emailIcon.setAttribute('d', 'M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z');
        }
    };
    
    fixSocialIcons();
    
    
    const createBackgroundPattern = () => {
        const green = document.querySelector('.green');
        const purple = document.querySelector('.purple');
        
        
        const greenSvg = document.createElementNS('http:
        greenSvg.setAttribute('width', '100%');
        greenSvg.setAttribute('height', '100%');
        greenSvg.classList.add('pattern-overlay');
        
        
        const pattern = document.createElementNS('http:
        pattern.setAttribute('id', 'dotPattern');
        pattern.setAttribute('width', '30');
        pattern.setAttribute('height', '30');
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        const dot = document.createElementNS('http:
        dot.setAttribute('cx', '3');
        dot.setAttribute('cy', '3');
        dot.setAttribute('r', '1.5');
        dot.classList.add('pattern-dot');
        pattern.appendChild(dot);
        
        const defs = document.createElementNS('http:
        defs.appendChild(pattern);
        greenSvg.appendChild(defs);
        
        const rect = document.createElementNS('http:
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', 'url(#dotPattern)');
        greenSvg.appendChild(rect);
        
        green.insertBefore(greenSvg, green.firstChild);
        
        
        const purpleSvg = greenSvg.cloneNode(true);
        purpleSvg.querySelector('pattern').setAttribute('id', 'dotPatternPurple');
        purpleSvg.querySelector('rect').setAttribute('fill', 'url(#dotPatternPurple)');
        purple.insertBefore(purpleSvg, purple.firstChild);
    };
    
    createBackgroundPattern();
});
