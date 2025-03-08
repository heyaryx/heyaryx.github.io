import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'https://unpkg.com/gsap@3.12.2/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
let particlesCount = 3000;
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
});

const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 50; // Reduced depth for better visibility
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.004,
    color: '#007AFF',
    transparent: true,
    opacity: 0.7
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // More subtle particle movement
    particlesMesh.rotation.y += 0.0001; // Reduced rotation speed
    particlesMesh.rotation.x += 0.00005;
    
    // Smoother particle movement towards mouse
    particlesMesh.position.x += (mouseX - particlesMesh.position.x) * 0.03; // Reduced multiplier
    particlesMesh.position.y += (-mouseY - particlesMesh.position.y) * 0.03;
    
    renderer.render(scene, camera);
}

animate();

// Enhanced initialization function
function initializePageFeatures() {
    const header = document.querySelector('header');
    if (header) {
        // Adjust scroll logic for mobile responsiveness
        const headerHeight = header.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollOffset = Math.max(0, (windowHeight - headerHeight) / 2);
        
        // Smooth scroll with a slight offset
        requestAnimationFrame(() => {
            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth'
            });
        });
    }
    
    // Ensure scroll down arrow is visible immediately
    const scrollDownButton = document.querySelector('.scroll-down');
    if (scrollDownButton) {
        scrollDownButton.style.opacity = '1';
        scrollDownButton.style.visibility = 'visible';
    }
    
    updateParticlesForDepth();
}

// Different initialization strategies for different browser support
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageFeatures);
} else {
    initializePageFeatures();
}

// Responsive handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
});

// Improved cursor tracking with smoother movement
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,  // Reduced for faster response
        ease: 'power2.out',  // Changed for smoother movement
        overwrite: "auto"    // Prevents animation queue buildup
    });
});

// Fixed unified hover animation for all elements (solving the row animation issue)
document.querySelectorAll('.category, .project').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.03,
            y: -4,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
            clearProps: "transform" // This helps prevent animation conflicts
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });
});

// Optimize section animations for smoother reveals
gsap.utils.toArray('section').forEach(section => {
    gsap.fromTo(section, 
        { 
            y: 15,  // Reduced movement for subtlety
            opacity: 0,
            scale: 0.995  // More subtle scale change
        }, 
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,  // Faster animation
            ease: "power2.out",  // Smoother easing
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: 'play none none none'
            }
        }
    );
});

// Smoother 3D effect for sections with reduced motion
document.addEventListener('mousemove', (e) => {
    const sections = document.querySelectorAll('section');
    const mouseX = (window.innerWidth / 2 - e.pageX) / 300; // Reduced divisor for subtler effect
    const mouseY = (window.innerHeight / 2 - e.pageY) / 300; 

    sections.forEach((section, index) => {
        const depth = 0.2 - (index * 0.03); // Reduced depth factor
        gsap.to(section, {
            rotationY: mouseX * depth,
            rotationX: mouseY * depth,
            transformPerspective: 1000,
            duration: 0.5, // Faster response
            ease: "power1.out", // Smoother easing
            overwrite: "auto" // Prevent animation queue buildup
        });
    });
});

// Enhanced ID card interactions with more pronounced swing animation
const idCardContainer = document.querySelector('.id-card-container');
const idCard = document.querySelector('.id-card');

if (idCardContainer && idCard) {
  // Add more pronounced swing animation
  gsap.to(idCardContainer, {
    rotation: 1.5,
    x: 5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  if ('ontouchstart' in window || window.matchMedia("(hover: none)").matches) {
    let cardFlipped = false;
    idCardContainer.addEventListener('click', () => {
      gsap.to(idCard, {
        rotateY: cardFlipped ? 0 : 180,
        duration: 0.4,  // Faster flip
        ease: "power2.out"
      });
      cardFlipped = !cardFlipped;
    });
  } else {
    idCardContainer.addEventListener('mouseenter', () => {
      gsap.to(idCard, {
        rotateY: 180,
        duration: 0.4,  // Faster flip
        ease: "power2.out"
      });
    });
    idCardContainer.addEventListener('mouseleave', () => {
      gsap.to(idCard, {
        rotateY: 0,
        duration: 0.4,  // Faster flip
        ease: "power2.out"
      });
    });
  }
}

// Enhanced contact section hover with faster, smoother 3D effect
const contactSection = document.getElementById('contact');
if (contactSection) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 968) {  
            const rect = contactSection.getBoundingClientRect();
            
            const xCenter = rect.left + rect.width / 2;
            const yCenter = rect.top + rect.height / 2;
            
            const xAxis = (e.clientX - xCenter) / (rect.width * 4>(); 
            const yAxis = (e.clientY - yCenter) / (rect.height * 4); 
            
            gsap.to(contactSection, {
                rotationY: xAxis * 1.5, 
                rotationX: -yAxis * 1.5, 
                transformPerspective: 1000,
                duration: 0.2, // Even faster duration
                ease: "power1.out", 
                transformOrigin: "center center",
                overwrite: "auto"
            });
        }
    });
    
    contactSection.addEventListener('mouseleave', () => {
        gsap.to(contactSection, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.2, // Matching faster return
            ease: "power1.out"
        });
    });
}

// Update particles for depth effect
function updateParticlesForDepth() {
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 50; // Reduced depth for better visibility
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
}

// Add theme toggle functionality
function setupThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        updateColorsForDarkMode();
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            updateColorsForDarkMode();
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
            updateColorsForLightMode();
        }
        // Animate the body to smoothly transition its scale and opacity during theme change
        gsap.fromTo(document.body, { scale: 0.95, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" });
    });
}

function updateColorsForDarkMode() {
    particlesMaterial.color.set('#0A84FF');
    document.querySelectorAll('.id-card-string').forEach(string => {
        string.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 100%)';
    });
}

function updateColorsForLightMode() {
    particlesMaterial.color.set('#007AFF');
    document.querySelectorAll('.id-card-string').forEach(string => {
        string.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)';
    });
}

// Initialize theme toggle
setupThemeToggle();

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    // Animate page scroll with a custom tween (fly up effect)
    let currentScroll = { y: window.scrollY };
    gsap.to(currentScroll, {
        y: 0,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => window.scrollTo(0, currentScroll.y)
    });
    // Animate the up button itself to fly upward and then reset its position
    gsap.to(scrollToTopBtn, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            gsap.set(scrollToTopBtn, { y: 0, opacity: 1 });
        }
    });
});

// Show/hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Show scroll button initially if page is already scrolled
if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
}

// Responsive adjustments for Three.js background
function adjustBackgroundParticles() {
    const isMobile = window.innerWidth <= 768;
    particlesMaterial.size = isMobile ? 0.002 : 0.004;
    particlesCount = isMobile ? 2000 : 3000;
}

window.addEventListener('resize', adjustBackgroundParticles);
adjustBackgroundParticles(); // Initial call