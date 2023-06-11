import Project from './newProject';
import './styles.css';
import { displayProjects, displayTodo } from './display';
// create the default project that will show when the app is launched for the first time.
const main = (() => {
  // an array holding all projects.
  let tempStorage;
  const projectArray = [];
  const defaultProject = new Project('default');
  displayProjects('default');
  // project creation.
  const createProject = (projectName) => {
    const newProject = new Project(projectName);
    projectArray.push(newProject);
    console.log(newProject);
    return newProject;
  };

  const deleteProject = (projectName) => {
    const indexToDelete = projectArray.findIndex((project) => project.name === projectName);
    if (indexToDelete === -1) {
      return;
    }
    projectArray.splice(indexToDelete, 1);
    console.log('project deleted!');
    console.log(projectArray);
  };

  return {
    projectArray, defaultProject, createProject, deleteProject, tempStorage,
  };
})();

// creates a project via form.
const projectCreationDOM = (() => {
  const createProjectButt = document.getElementById('createProjectButt');
  const projectForm = document.getElementById('createProjectForm');
  const projectFormContainer = document.getElementById('projectFormContainer');

  // the 'create project' pop-up.
  createProjectButt.addEventListener('click', () => {
    if (projectForm.style.display === 'none' && projectFormContainer.style.display === 'none') {
      projectForm.style.display = 'flex';
      projectFormContainer.style.display = 'flex';
    } else {
      projectForm.style.display = 'none';
      projectFormContainer.style.display = 'none';
    }
  });

  // sets up a project based on form data.
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // get input
    const formInput = document.getElementById('project_name');
    if (formInput.value === '') {
      alert('must not be empty!');
      return;
    }

    const duplicateName = main.projectArray.findIndex((task) => task.name === formInput.value);
    if (duplicateName !== -1) {
      alert('name already taken!');
      return;
    }

    // create a new project object based on form input
    const newProject = main.createProject(formInput.value);
    // close the pop-up
    projectForm.style.display = 'none';
    projectFormContainer.style.display = 'none';
    // clicking on the button will result in the removal of the project object from the
    // main projects array and the project's respective DOM element.
    const projectDisplay = displayProjects(formInput.value);
    formInput.value = '';
    projectDisplay.projectDeleteButt.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskArea = document.querySelector('.taskArea');
      main.deleteProject(newProject.name);
      projectDisplay.projectElement.remove();
      while (taskArea.firstChild) {
        taskArea.firstChild.remove();
      }
    });

    // attaches an event on the add task button.
    projectDisplay.addTaskButt.addEventListener('click', (event) => {
      event.stopPropagation();
      // stores the current project in a temp storage.
      const project = newProject;
      main.tempStorage = project;
      const taskCreationForm = document.getElementById('createTaskForm');
      if (taskCreationForm.style.display === 'none') {
        taskCreationForm.style.display = 'flex';
      } else {
        main.tempStorage = '';
        taskCreationForm.style.display = 'none';
      }
    });

    // will display each project's tasks
    projectDisplay.projectElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskArea = document.querySelector('.taskArea');
      taskArea.textContent = '';
      displayTodo(newProject);
    });
    console.log(main.projectArray);
  });

  // ties tasks to their respective projects.
  const taskCreationForm = document.getElementById('createTaskForm');
  taskCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get taskCreation form input
    const taskTitle = document.getElementById('title');
    const taskDescription = document.getElementById('description');
    const taskDate = document.getElementById('date');
    const taskOptions = document.getElementById('options');
    main.tempStorage.createTodo(
      taskTitle.value,
      taskDescription.value,
      taskDate.value,
      taskOptions.value,
    );
    taskCreationForm.style.display = 'none';
    taskTitle.value = '';
    taskDescription.value = '';
    taskDate.value = '';
    taskOptions.value = '';
  });
})();
