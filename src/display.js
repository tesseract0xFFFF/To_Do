// displays the newly created projects.
const displayProjects = (projectName) => {
  const projectArea = document.querySelector('.projectArea');
  const projectElement = document.createElement('div');
  const projectDeleteButt = document.createElement('button');
  const addTaskButt = document.createElement('button');
  // won't add a delete button to the default project.
  if (projectName === 'default') {
    addTaskButt.className += 'addTaskButtons';
    addTaskButt.textContent = '+';
    projectElement.textContent = projectName;
    projectElement.appendChild(addTaskButt);
    projectArea.appendChild(projectElement);
  } else {
    projectDeleteButt.className += 'projectDeleteButtons';
    projectDeleteButt.textContent = 'del';
    addTaskButt.className += 'addTaskButtons';
    addTaskButt.textContent = '+';
    projectElement.textContent = projectName;
    projectElement.appendChild(projectDeleteButt);
    projectElement.appendChild(addTaskButt);
    projectArea.appendChild(projectElement);
  }

  return { projectDeleteButt, projectElement, addTaskButt };
};

const displayTodo = (project) => {
  const taskArea = document.querySelector('.taskArea');
  // clears display.
  taskArea.textContent = '';
  project.todoArray.forEach((element) => {
    const todoElement = document.createElement('div');
    const titleElement = document.createElement('div');
    const descriptionElement = document.createElement('div');
    const dateEelement = document.createElement('div');
    const priorityElement = document.createElement('div');
    titleElement.textContent = element.title;
    descriptionElement.textContent = element.description;
    dateEelement.textContent = element.dueDate;
    priorityElement.textContent = element.priority;
    todoElement.appendChild(titleElement);
    todoElement.appendChild(descriptionElement);
    todoElement.appendChild(dateEelement);
    todoElement.appendChild(priorityElement);
    taskArea.appendChild(todoElement);
    return { todoElement };
  });
};

export { displayProjects, displayTodo };
