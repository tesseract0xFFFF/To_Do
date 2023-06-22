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
    console.log(this.todoArray);
  }

  // editTodo(taskToEdit, elemTitle, elemDescription, elemDuedate, elemPriority) {
  //   const indexToEdit = this.todoArray.findIndex((task) => task.title === taskToEdit);
  //   if (indexToEdit === -1) {
  //     console.log('Task does not exist');
  //     return;
  //   }

  //   this.todoArray[indexToEdit].title = elemTitle;
  //   this.todoArray[indexToEdit].description = elemDescription;
  //   this.todoArray[indexToEdit].dueDate = elemDuedate;
  //   this.todoArray[indexToEdit].priority = elemPriority;
  // }
}
