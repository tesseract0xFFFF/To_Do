import Project from './newProject';
import './styles.css';
import { displayProjects } from './display';
// create the default project that will show when the app is launched for the first time.
const main = (() => {
  // an array holding all projects.
  const projectArray = [];
  const defaultProject = new Project('default');
  displayProjects('default');
  // project creation.
  const createProject = (projectName) => {
    const newProject = new Project(projectName);
    projectArray.push(newProject);
    return newProject;
  };

  const deleteProject = (projectName) => {
    const indexToDelete = projectArray.findIndex((task) => task === projectName);
    if (indexToDelete === -1) {
      return;
    }
    projectArray.splice(indexToDelete, 1);
    console.log('project deleted!');
  };

  return {
    projectArray, defaultProject, createProject, deleteProject,
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

  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // get input
    const formInput = document.getElementById('project_name');
    if (formInput.value === '') {
      alert('must not be empty!');
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
    projectDisplay.projectDeleteButt.addEventListener('click', () => {
      main.deleteProject(newProject);
      projectDisplay.projectElement.remove();
    });
  });
})();
