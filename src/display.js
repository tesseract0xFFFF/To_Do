// displays the newly created projects.
const displayProjects = (projectName) => {
  const projectArea = document.querySelector('.projectArea');
  const projectElement = document.createElement('div');
  projectElement.textContent = projectName;
  projectArea.appendChild(projectElement);
};

export { displayProjects };
