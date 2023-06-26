import { main } from './app';

export default class Project {
  constructor(name) {
    this.name = name;
    this.todoArray = [];
  }

  // creates todo tasks.
  createTodo(newTitle, newDescription, newDueDate, newPriority) {
    const todoObject = {
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      priority: newPriority,
    };
    this.todoArray.push(todoObject);
    console.log('task created!');
    if (this.name === 'default') {
      main.projectArray[0] = this;
    }
    // projectArray needs to be updated with the new project instances.
    //  So the saves into localStorage will work.
    const projectIndex = main.projectArray.findIndex((project) => project.name === this.name);
    main.projectArray[projectIndex] = this;
    localStorage.setItem('projectArray', JSON.stringify(main.projectArray));

    console.log(this.todoArray);
    return todoObject;
  }

  // delets said tasks from the current project array.
  // looks for title properties that match.
  deleteTodo(taskToDelete) {
    const indexToDelete = this.todoArray.findIndex((task) => task.title === taskToDelete);
    if (indexToDelete === -1) {
      console.log('Does not equal');
      return;
    }
    this.todoArray.splice(indexToDelete, 1);
    // projectArray needs to be updated with the new project instances.
    //  So the saves into localStorage will work.
    const projectIndex = main.projectArray.findIndex((project) => project.name === this.name);
    main.projectArray[projectIndex] = this;
    localStorage.setItem('projectArray', JSON.stringify(main.projectArray));
    console.log(this.todoArray);
  }
}
