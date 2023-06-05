import Project from './newProject.js';
// create the default project that will show when the app is launched for the first time.
const main = (() => {
  const projectArray = [];
  const defaultProject = new Project('default');
  return { projectArray, defaultProject };
})();

console.log(main.defaultProject);
