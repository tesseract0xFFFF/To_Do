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
  deleteTodo(taskToDelete) {
    const indexToDelete = this.todoArray.findIndex((task) => task === taskToDelete);
    if (indexToDelete === -1) {
      return;
    }
    this.todoArray.splice(indexToDelete, 1);
  }
}

// const newp = new Project('kaki');
// // const newp1 = new Project('kwik');

// const p1 = newp.createTodo('eat', 'eating', 'tmrw', 'high');
// const p2 = newp.createTodo('kaki', 'kaki2', 'kaki3', 'kaki4');
// // newp1.createTodo('kawik1', 'kawik2', 'kawik3', 'kawik4');
// newp.deleteTodo(p1);
// console.log(newp.todoArray);
// // console.log(newp1.todoArray);
