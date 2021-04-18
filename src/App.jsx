import React, { Component } from 'react';
import InputForm from './components/InputForm';
import TodoItem from './components/TodoItem';
import { nanoid } from 'nanoid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.props.tasks 
    };
    this.addTask = this.addTask.bind(this);
    this.toggleTaskCompleted = this.toggleTaskCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  addTask(name, priority) {
    const newTask = {
      id: 'todo-' + nanoid(),
      name: name, 
      completed: false, 
      priority: priority
    };
    const tasks = this.state.tasks.concat([newTask]);
    this.setState({ tasks: tasks });
  }

  toggleTaskCompleted(id) {
    const updatedTasks = this.state.tasks;
    updatedTasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id == task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        task.completed = !task.completed;
      }
    });
    this.setState({ tasks: updatedTasks });
  }

  deleteTask(id) {
    const remainingTasks = this.state.tasks.filter(task => id !== task.id);
    this.setState({ tasks: remainingTasks });
  }

  updateTask(id, newName, newPriority) {
    const updatedTaskList = this.state.tasks.map(task => {
      if (id === task.id) {
        return {
          ...task, 
          name: newName, 
          score: newPriority
        }
      }
      return task;
    });
    console.log('updating players...');
    this.setState({ tasks: updatedTaskList });
  }

  render() {
    const taskList = this.state.tasks.map(task => (
      <TodoItem 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id} 
        score={task.score}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
        updateTask={this.updateTask}
      />
    ));
  
    const welcomeView = (
      <li className='list-group-item list-group-item-info'>
        <p className='list-group-item-text'><strong>Welcome to Very Simple Todo App!</strong></p>
        <p className='list-group-item-text'>Get started now by adding a new todo on the left.</p>
      </li>
    );

    return (
      <div className='container'>
        <div className='page-header white'>
          <h1>OBG Proprietary Scoreboard Technology</h1>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <InputForm tasks={this.state.tasks} />
          </div>
          <div className='col-md-6'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Player Inputs</div>
              <div className='panel-body no-padding'>
                <ul className='list-group no-margin'>
                  {this.state.tasks.length > 0 ? taskList : welcomeView}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
