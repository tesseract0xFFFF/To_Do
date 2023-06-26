import Project from './newProject';
import './styles.css';
import { displayProjects, displayTodo } from './display';
// create the default project that will show when the app is launched for the first time.
const main = (() => {
  // temp storage is for projects.
  let tempStorage;

  let projectArray;

  function setProjectArray(value) {
    projectArray = value;
  }

  // will create a default project if localStorage is empty.
  if (!localStorage.getItem('projectArray')) {
    setProjectArray([]);
    const defaultProject = new Project('default');
    projectArray.push(defaultProject);
    const defaultProjectDisplay = displayProjects('default');
    // clicking on default project will display its associated tasks.
    defaultProjectDisplay.projectElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskArea = document.querySelector('.taskArea');
      taskArea.textContent = '';
      displayTodo(defaultProject);
    });

    // adding tasks to the default project.
    defaultProjectDisplay.addTaskButt.addEventListener('click', (event) => {
      event.stopPropagation();
      // stores the current project in a temp storage.
      const project = defaultProject;
      tempStorage = project;
      const taskCreationForm = document.getElementById('createTaskForm');
      if (taskCreationForm.style.display === 'none') {
        taskCreationForm.style.display = 'flex';
      } else {
        tempStorage = '';
        taskCreationForm.style.display = 'none';
      }
    });
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
  } else {
    const localStorageData = JSON.parse(localStorage.getItem('projectArray'));
    setProjectArray(localStorageData);
  }
  console.log(projectArray);

  // project creation.
  const createProject = (projectName) => {
    const newProject = new Project(projectName);
    projectArray.push(newProject);
    console.log(newProject);
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    return newProject;
  };

  const deleteProject = (projectName) => {
    const indexToDelete = projectArray.findIndex((project) => project.name === projectName);
    if (indexToDelete === -1) {
      return;
    }
    projectArray.splice(indexToDelete, 1);
    console.log('project deleted!');
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    console.log(projectArray);
  };

  return {
    projectArray,
    createProject,
    deleteProject,
    tempStorage,
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
    projectDisplay.projectDeleteButt.addEventListener('click', (delEvent) => {
      delEvent.stopPropagation();
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
    // okay, this is  a messy one. bad planning has made sharing data
    // between the modules and functions pretty difficult.
    // I have used temp storages to pass said data around.
    e.preventDefault();
    e.stopPropagation();

    // get taskCreation form input
    const taskTitle = document.getElementById('title');
    const taskDescription = document.getElementById('description');
    const taskDate = document.getElementById('date');
    const taskOptions = document.getElementById('options');

    const duplicateName = main.tempStorage.todoArray.findIndex(
      (task) => task.title === taskTitle.value,
    );
    if (duplicateName !== -1) {
      alert('name already taken!');
      return;
    }

    main.tempStorage.createTodo(
      taskTitle.value,
      taskDescription.value,
      taskDate.value,
      taskOptions.value,
    );
    const taskArea = document.querySelector('.taskArea');
    taskArea.textContent = '';

    displayTodo(main.tempStorage);
    localStorage.setItem('projectArray', JSON.stringify(main.projectArray));

    // gotta reset values.
    main.tempStorage = '';
    taskCreationForm.style.display = 'none';
    taskTitle.value = '';
    taskDescription.value = '';
    taskDate.value = '';
    taskOptions.value = '';
  });
})();

const todoStorage = (() => {
  if (!localStorage.getItem('projectArray')) {
    console.log('localStorage empty');
  } else {
    const storedObject = JSON.parse(localStorage.getItem('projectArray'));
    // an array of key-value arrays containing the project objects.
    const storedObjectArray = Object.entries(storedObject);
    // attempt to create projects based on localStorage
    storedObjectArray.forEach((element) => {
      const newProj = new Project(element[1].name);
      const projectDisplayElements = displayProjects(element[1].name);

      // copies todo array to new project object.
      newProj.todoArray = element[1].todoArray;

      // deleting a project
      projectDisplayElements.projectDeleteButt.addEventListener('click', (delEvent) => {
        delEvent.stopPropagation();
        const taskArea = document.querySelector('.taskArea');
        main.deleteProject(newProj.name);
        projectDisplayElements.projectElement.remove();
        while (taskArea.firstChild) {
          taskArea.firstChild.remove();
        }
      });

      // attaches an event on the add task button.
      projectDisplayElements.addTaskButt.addEventListener('click', (event) => {
        event.stopPropagation();
        // stores the current project in a temp storage.
        const project = newProj;
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
      projectDisplayElements.projectElement.addEventListener('click', (event) => {
        event.stopPropagation();
        const taskArea = document.querySelector('.taskArea');
        taskArea.textContent = '';
        displayTodo(newProj);
      });

      console.log(storedObjectArray);
    });
  }
})();

export { main };
