
export const state = {
  theme: 'light',
  activePanel: null,
  isLoading: false
};

// Theme Management
export function initTheme() {
  // Check localStorage first, then system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  state.theme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(state.theme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      state.theme = e.matches ? 'dark' : 'light';
      applyTheme(state.theme);
    }
  });
  
  console.log('[state] Theme initialized:', state.theme);
}

export function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
  localStorage.setItem('theme', state.theme);
  console.log('[state] Theme toggled to:', state.theme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

// Panel Management
export function setActivePanel(panel) {
  state.activePanel = panel;
  
  // Manage body scroll
  if (panel) {
    document.body.classList.add('panel-open');
  } else {
    document.body.classList.remove('panel-open');
  }
}

// Loading State
export function setLoading(isLoading) {
  state.isLoading = isLoading;
  console.log('[state] Loading:', isLoading);
}

// Debug helper
export function getState() {
  return { ...state };
}