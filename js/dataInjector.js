
// Fetch JSON data with error handling
async function fetchData(file) {
  try {
    const res = await fetch(file);
    if (!res.ok) {
      console.error(`[dataInjector] Fetch failed: ${file} -> ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    console.log(`[dataInjector] Successfully loaded: ${file}`);
    return data;
  } catch (err) {
    console.error(`[dataInjector] Fetch error for ${file}:`, err);
    return null;
  }
}

// Safe DOM append with validation
function safeAppend(container, child) {
  if (!container) {
    console.warn('[dataInjector] Container is null, cannot append child');
    return false;
  }
  if (!child) {
    console.warn('[dataInjector] Child element is null, cannot append');
    return false;
  }
  container.appendChild(child);
  return true;
}

// Create loading indicator
function createLoadingIndicator() {
  const loader = document.createElement('div');
  loader.className = 'loading-indicator';
  loader.innerHTML = '<p class="muted loading">Loading...</p>';
  return loader;
}

// Create error message
function createErrorMessage(message) {
  const error = document.createElement('div');
  error.className = 'error-message';
  error.innerHTML = `<p class="muted">${message}</p>`;
  return error;
}

// ==================== Education ====================
export async function populateEducation() {
  const eduPanel = document.getElementById('education-list');
  if (!eduPanel) {
    console.warn('[dataInjector] education-list not found');
    return;
  }
  
  eduPanel.innerHTML = '';
  eduPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/education.json');
  eduPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    eduPanel.appendChild(createErrorMessage('Education data not available yet.'));
    return;
  }

  data.forEach((item, index) => {
    const eduItem = document.createElement('div');
    eduItem.className = 'education-item';
    
    const logo = item.logo || 'assets/logos/placeholder.png';
    const university = item.university || 'University';
    const degree = item.degree || 'Degree';
    const duration = item.duration || '';
    const location = item.location || '';

    eduItem.innerHTML = `
      <div class="edu-logo">
        <img src="${logo}" alt="${university} logo" loading="lazy" onerror="this.src='assets/logos/placeholder.png'">
      </div>
      <div class="edu-info">
        <h3>${degree}</h3>
        <p>${university}${duration ? ' • ' + duration : ''}${location ? ' • ' + location : ''}</p>
      </div>
    `;
    
    safeAppend(eduPanel, eduItem);
  });
}

// ==================== Projects ====================
export async function populateProjects() {
  const projPanel = document.getElementById('projects-list');
  if (!projPanel) {
    console.warn('[dataInjector] projects-list not found');
    return;
  }
  
  projPanel.innerHTML = '';
  projPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/projects.json');
  projPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    projPanel.appendChild(createErrorMessage('Projects data not available yet.'));
    return;
  }

  data.forEach((item, index) => {
    const projItem = document.createElement('div');
    projItem.className = 'project-item';
    
    const logo = item.logo ? `<div class="project-logo"><img src="${item.logo}" alt="${item.title} logo" loading="lazy" onerror="this.src='assets/project-logos/placeholder.png'"></div>` : '';
    const title = item.title || 'Project';
    const description = item.description || 'No description available.';
    const repo = item.repo ? `<a href="${item.repo}" target="_blank" rel="noopener noreferrer" class="project-link">View on GitHub</a>` : '';
    const tags = Array.isArray(item.tags) && item.tags.length > 0 ? `<small>${item.tags.join(', ')}</small>` : '';
    
    projItem.innerHTML = `
      <div class="project-header">
        ${logo}
        <div class="project-info">
          <h3>${title}</h3>
        </div>
      </div>
      <p>${description}</p>
      ${repo}
      ${tags}
    `;
    
    safeAppend(projPanel, projItem);
  });
}

// ==================== Experience ====================
export async function populateExperience() {
  const expPanel = document.getElementById('experience-list');
  if (!expPanel) {
    console.warn('[dataInjector] experience-list not found');
    return;
  }
  
  expPanel.innerHTML = '';
  expPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/experience.json');
  expPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    expPanel.appendChild(createErrorMessage('Experience data not available yet.'));
    return;
  }

  data.forEach((item, index) => {
    const expItem = document.createElement('div');
    expItem.className = 'experience-item';
    
    const role = item.role || 'Position';
    const organization = item.organization || 'Organization';
    const duration = item.duration || '';
    const location = item.location || '';
    const description = item.description || '';
    
    expItem.innerHTML = `
      <h3>${role}</h3>
      <p class="text-muted">${organization}${duration ? ' • ' + duration : ''}${location ? ' • ' + location : ''}</p>
      ${description ? `<p>${description}</p>` : ''}
    `;
    
    expItem.style.cssText = `
      margin-bottom: var(--space-xl);
      padding: var(--space-lg);
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      border-left: 4px solid var(--color-primary);
      animation: slideInRight 0.5s ease-out both;
      animation-delay: ${index * 0.1}s;
    `;
    
    safeAppend(expPanel, expItem);
  });
}

// ==================== Research Interests ====================
export async function populateResearch() {
  const researchPanel = document.getElementById('research-list');
  if (!researchPanel) {
    console.warn('[dataInjector] research-list not found');
    return;
  }
  
  researchPanel.innerHTML = '';
  researchPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/research.json');
  researchPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    researchPanel.appendChild(createErrorMessage('Research data not available yet.'));
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list-panel';
  
  data.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item || 'Research interest';
    ul.appendChild(li);
  });
  
  safeAppend(researchPanel, ul);
}

// ==================== Languages ====================
export async function populateLanguages() {
  const langPanel = document.getElementById('langs-list');
  if (!langPanel) {
    console.warn('[dataInjector] langs-list not found');
    return;
  }
  
  langPanel.innerHTML = '';
  langPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/languages.json');
  langPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    langPanel.appendChild(createErrorMessage('Languages data not available yet.'));
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list-panel';
  
  data.forEach((lang, index) => {
    const name = lang.name || 'Language';
    const level = lang.level || '';
    const li = document.createElement('li');
    li.textContent = `${name}${level ? ' — ' + level : ''}`;
    ul.appendChild(li);
  });
  
  safeAppend(langPanel, ul);
}

// ==================== Skills ====================
export async function populateSkills() {
  const skillsPanel = document.getElementById('skills-list');
  if (!skillsPanel) {
    console.warn('[dataInjector] skills-list not found');
    return;
  }
  
  skillsPanel.innerHTML = '';
  skillsPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/skills.json');
  skillsPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    skillsPanel.appendChild(createErrorMessage('Skills data not available yet.'));
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list-panel';
  
  data.forEach((skill, index) => {
    const li = document.createElement('li');
    li.textContent = skill || 'Skill';
    ul.appendChild(li);
  });
  
  safeAppend(skillsPanel, ul);
}

// ==================== Awards ====================
export async function populateAwards() {
  const awardsPanel = document.getElementById('awards-list');
  if (!awardsPanel) {
    console.warn('[dataInjector] awards-list not found');
    return;
  }
  
  awardsPanel.innerHTML = '';
  awardsPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/awards.json');
  awardsPanel.innerHTML = '';
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    awardsPanel.appendChild(createErrorMessage('Awards data not available yet.'));
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list-panel';
  
  data.forEach((award, index) => {
    const li = document.createElement('li');
    const title = award.title || 'Award';
    const year = award.year || '';
    li.textContent = `${title}${year ? ' — ' + year : ''}`;
    ul.appendChild(li);
  });
  
  safeAppend(awardsPanel, ul);
}

// ==================== Publications ====================
export async function populatePublications() {
  const pubPanel = document.getElementById('publications-list');
  if (!pubPanel) {
    console.warn('[dataInjector] publications-list not found');
    return;
  }

  pubPanel.innerHTML = '';
  pubPanel.appendChild(createLoadingIndicator());

  const data = await fetchData('data/publications.json');
  pubPanel.innerHTML = '';

  if (!data || !Array.isArray(data) || data.length === 0) {
    pubPanel.appendChild(createErrorMessage('Publications data not available yet.'));
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list-panel';

  data.forEach((pub, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${pub.title}</strong><br>
      ${pub.authors.join(', ')}<br>
      ${pub.affiliations.join('; ')}<br>
      ${pub.journal || ''} ${pub.year ? '• ' + pub.year : ''}<br>
      ${pub.status ? '<em>Status: ' + pub.status + '</em>' : ''}<br>
      ${pub.doi ? '<a href="' + pub.doi + '" target="_blank">DOI</a>' : ''}
    `;
    ul.appendChild(li);
  });

  safeAppend(pubPanel, ul);
}


// ==================== Initialize All ====================
export async function initPanels() {
  console.log('[dataInjector] Starting data initialization...');
  
  const startTime = performance.now();
  
  try {
    // Load all data in parallel for better performance
    await Promise.all([
      populateEducation(),
      populateProjects(),
      populateExperience(),
      populateResearch(),
      populateLanguages(),
      populateSkills(),
      populateAwards(),
      populatePublications()
    ]);
    
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    console.log(`[dataInjector] All data loaded successfully in ${duration}ms`);
  } catch (error) {
    console.error('[dataInjector] Error during initialization:', error);
  }
}