
import { state, setActivePanel } from './state.js';

// Open a panel by ID
export function openPanel(panelId) {
  console.log('[panels] Opening panel:', panelId);
  
  // Close any active panel first
  if (state.activePanel) {
    closePanel(state.activePanel);
  }
  
  const panel = document.getElementById(panelId);
  const overlay = document.getElementById('overlay');
  
  if (!panel) {
    console.warn('[panels] Panel not found:', panelId);
    return;
  }
  
  // Activate panel and overlay
  panel.classList.add('active');
  overlay.classList.add('active');
  setActivePanel(panel);
  
  // Set focus to panel for accessibility
  panel.setAttribute('tabindex', '-1');
  panel.focus();
  
  // Trap focus within panel
  trapFocus(panel);
}

// Close a panel
export function closePanel(panel) {
  if (!panel) return;
  
  console.log('[panels] Closing panel:', panel.id);
  
  const overlay = document.getElementById('overlay');
  
  panel.classList.remove('active');
  overlay.classList.remove('active');
  setActivePanel(null);
  
  // Remove focus trap
  removeFocusTrap(panel);
}

// Initialize all panel handlers
export function initPanelHandlers() {
  console.log('[panels] Initializing panel handlers');
  
  // Close buttons
  const closeButtons = document.querySelectorAll('.close-panel');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.closest('.panel');
      closePanel(panel);
    });
  });
  
  // Overlay click
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (state.activePanel) {
        closePanel(state.activePanel);
      }
    });
  }
  
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activePanel) {
      closePanel(state.activePanel);
    }
  });
}

// Focus trap for accessibility
let focusableElements = [];
let firstFocusable = null;
let lastFocusable = null;

function trapFocus(panel) {
  focusableElements = panel.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  firstFocusable = focusableElements[0];
  lastFocusable = focusableElements[focusableElements.length - 1];
  
  panel.addEventListener('keydown', handleFocusTrap);
}

function handleFocusTrap(e) {
  if (e.key !== 'Tab') return;
  
  if (e.shiftKey) {
    // Shift + Tab
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    }
  } else {
    // Tab
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

function removeFocusTrap(panel) {
  panel.removeEventListener('keydown', handleFocusTrap);
  focusableElements = [];
  firstFocusable = null;
  lastFocusable = null;
}

// Utility: Check if panel is active
export function isPanelActive(panelId) {
  const panel = document.getElementById(panelId);
  return panel && panel.classList.contains('active');
}

// Utility: Get active panel
export function getActivePanel() {
  return state.activePanel;
}