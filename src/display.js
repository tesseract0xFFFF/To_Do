import Project from './newProject';
import { main } from './app';

const editTodo = (() => {
  // ediding goes by the way of deleting the todo object and creating a new one
  // (so not really editing).
  let titleTempStorage;
  let projectTempStorage;
  const taskEditForm = document.getElementById('editTaskForm');
  const taskEditContainer = document.getElementById('taskEditContainer');

  function setTitleTempStorage(val) {
    titleTempStorage = val;
  }

  function setProjectTempStorage(val) {
    projectTempStorage = val;
  }

  taskEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const editTaskTitle = document.getElementById('editTitle');
    const editTaskDescription = document.getElementById('editDescription');
    const editTaskDate = document.getElementById('editDate');
    const editTaskOptions = document.getElementById('editOptions');

    // create a new project
    projectTempStorage.createTodo(
      editTaskTitle.value,
      editTaskDescription.value,
      editTaskDate.value,
      editTaskOptions.value,
    );

    // delete former todo task object.

    projectTempStorage.deleteTodo(titleTempStorage);

    taskEditContainer.style.display = 'none';
    taskEditForm.style.display = 'none';

    localStorage.setItem('projectArray', JSON.stringify(main.projectArray));
    displayTodo(projectTempStorage);
    setTitleTempStorage('');
    setProjectTempStorage('');
  });

  return {
    titleTempStorage, projectTempStorage, setTitleTempStorage, setProjectTempStorage,
  };
})();

// displays the newly created projects.
const displayProjects = (projectName) => {
  const projectArea = document.querySelector('.projectArea');
  const projectElement = document.createElement('div');
  projectElement.classList.add('hover-effect');
  const projectDeleteButt = document.createElement('button');
  const addTaskButt = document.createElement('button');
  // won't add a delete button to the default project.
  if (projectName === 'default') {
    addTaskButt.classList.add('addTaskButtons');
    addTaskButt.textContent = '+';
    projectElement.textContent = projectName;
    projectElement.appendChild(addTaskButt);
    projectArea.appendChild(projectElement);
  } else {
    projectDeleteButt.classList.add('projectDeleteButtons');
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

function displayTodo(project) {
  const taskArea = document.querySelector('.taskArea');
  const taskEditContainer = document.getElementById('taskEditContainer');
  const taskEditForm = document.getElementById('editTaskForm');

  // clears display.
  taskArea.textContent = '';
  project.todoArray.forEach((element) => {
    const todoElement = document.createElement('div');
    const titleElement = document.createElement('div');
    const descriptionElement = document.createElement('div');
    const dateEelement = document.createElement('div');
    const priorityElement = document.createElement('div');
    const delButt = document.createElement('button');
    delButt.classList.add('taskDelButt');
    delButt.textContent = 'del';
    const editButt = document.createElement('button');
    editButt.classList.add('taskEditButt');
    editButt.textContent = 'edit';

    titleElement.textContent = element.title;
    descriptionElement.textContent = element.description;
    dateEelement.textContent = element.dueDate;
    priorityElement.textContent = element.priority;

    // handles deleting tasks.
    delButt.addEventListener('click', (event) => {
      event.stopPropagation();
      project.deleteTodo(element.title);
      while (todoElement.firstChild) {
        todoElement.firstChild.remove();
      }
      todoElement.remove();
      console.log(project.todoArray);
    });

    // brings up an edit task form.
    editButt.addEventListener('click', (e) => {
      e.stopPropagation();
      const todotitle = element.title;
      const projectToEdit = project;

      editTodo.setTitleTempStorage(todotitle);
      editTodo.setProjectTempStorage(projectToEdit);

      if (taskEditContainer.style.display === 'none' && taskEditForm.style.display === 'none') {
        taskEditContainer.style.display = 'flex';
        taskEditForm.style.display = 'block';
        // every time the form comes up - the task's title and
        // containing project will be saved in a temp location.
      } else {
        taskEditContainer.style.display = 'none';
        taskEditForm.style.display = 'none';
        editTodo.setTitleTempStorage('');
        editTodo.setProjectTempStorage('');
      }
    });

    todoElement.appendChild(titleElement);
    todoElement.appendChild(descriptionElement);
    todoElement.appendChild(dateEelement);
    todoElement.appendChild(priorityElement);
    todoElement.appendChild(delButt);
    todoElement.appendChild(editButt);
    taskArea.appendChild(todoElement);
  });
}

export { displayProjects, displayTodo };
