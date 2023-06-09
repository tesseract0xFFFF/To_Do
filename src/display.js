// displays the newly created projects.
const displayProjects = (projectName) => {
  const projectArea = document.querySelector('.projectArea');
  const projectElement = document.createElement('div');
  const projectDeleteButt = document.createElement('button');
  // won't add a delete button to the default project.
  if (projectName === 'default') {
    projectElement.textContent = projectName;
    projectArea.appendChild(projectElement);
  } else {
    projectDeleteButt.className += 'projectDeleteButtons';
    projectDeleteButt.textContent = 'del';
    projectElement.textContent = projectName;
    projectElement.appendChild(projectDeleteButt);
    projectArea.appendChild(projectElement);
  }

  return { projectDeleteButt, projectElement };
};

export { displayProjects };
