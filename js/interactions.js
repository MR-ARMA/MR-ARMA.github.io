
import { openPanel, closePanel } from './panels.js';
import { toggleTheme } from './state.js';

export function initInteractions() {
  console.log('[interactions] Initializing UI interactions');
  
  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();
      
      // Add animation feedback
      themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 300);
    });
  }
  
  // Chip buttons to open panels
  const chips = document.querySelectorAll('.chip[data-panel]');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const panelId = chip.getAttribute('data-panel');
      openPanel(panelId);
    });
    
    // Add hover sound effect (optional)
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = '';
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add ripple effect to buttons (visual feedback)
  document.querySelectorAll('.chip, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add parallax effect to hero (optional enhancement)
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const hero = document.querySelector('.hero');
      if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
      }
    });
  }
  
  // Keyboard navigation enhancement
  document.addEventListener('keydown', (e) => {
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      toggleTheme();
    }
    
    // Number keys 1-7 to open panels
    if (e.key >= '1' && e.key <= '7' && !e.ctrlKey && !e.altKey) {
      const panels = [
        'panel-edu-full',
        'panel-projects-full',
        'panel-experience-full',
        'panel-research-full',
        'panel-skills-full',
        'panel-langs-full',
        'panel-awards-full'
      ];
      const index = parseInt(e.key) - 1;
      if (panels[index]) {
        openPanel(panels[index]);
      }
    }
  });
  
  console.log('[interactions] UI interactions initialized');
}

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);