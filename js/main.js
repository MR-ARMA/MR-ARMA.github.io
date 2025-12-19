import { state, toggleTheme, initTheme } from './state.js';
import { openPanel, closePanel, initPanelHandlers } from './panels.js';
import { initInteractions } from './interactions.js';
import { initPanels } from './dataInjector.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[main] Initializing portfolio...');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark');
  } else {
    document.body.classList.add('dark');
  }

  try {
    initTheme();
    
    initInteractions();
    initPanelHandlers();
    
    await initPanels();
    
    console.log('[main] Portfolio initialized successfully');
  } catch (error) {
    console.error('[main] Error initializing portfolio:', error);
  }
});


// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.activePanel) {
    // Optional: close panel when user switches tabs
    // closePanel(state.activePanel);
  }
});

// Prevent accidental navigation
window.addEventListener('beforeunload', (e) => {
  if (state.activePanel) {
    // Optional: warn user if panel is open
    // e.preventDefault();
    // e.returnValue = '';
  }
});

// Export for potential external use
export { state, toggleTheme, openPanel, closePanel };