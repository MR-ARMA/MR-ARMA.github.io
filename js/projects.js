document.addEventListener("DOMContentLoaded", () => {
  const projectsList = document.getElementById("projects-list");

  fetch("data/projects.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.repo}" target="_blank" class="project-link">View Repo</a>
        `;
        projectsList.appendChild(projectItem);
      });
    })
    .catch(err => console.error("Error loading projects JSON:", err));
});
