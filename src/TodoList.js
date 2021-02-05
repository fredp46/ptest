import cx from "classnames";
import { Component } from "react";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoTitle: "",
    };
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTodoTitle) {
      this.props.addItem({
        title: this.state.newTodoTitle,
      });
    }
  };
  onChangeNewTodo = (e) => {
    this.setState({
      newTodoTitle: e.target.value,
    });
  };
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="text" onChange={this.onChangeNewTodo}></input>
        <button type="submit" disabled={!this.state.newTodoTitle.length}>
          Add
        </button>
      </form>
    );
  }
}

const getRemainingCount = (items) => {
  const itemsCount = items.filter((item) => !item.complete);
  return itemsCount.length;
};

const TodoListItem = ({ id, title, complete, toggleComplete }) => {
  const className = complete ? "is-done" : "";
  return (
    <li className={className} onClick={() => toggleComplete({ id })}>
      {title}
    </li>
  );
};

class TodoItems extends Component {
  render() {
    const { items, toggleComplete } = this.props;
    return (
      <>
        <div>
          {`${getRemainingCount(items)} remaining out of ${items.length} tasks`}
        </div>

        <ul>
          {items &&
            items.map((item, i) => {
              return (
                <TodoListItem
                  key={i}
                  {...item}
                  toggleComplete={toggleComplete}
                />
              );
            })}
        </ul>
      </>
    );
  }
}

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [{ title: "asd", complete: false }] };
  }

  addItem = (todo) => {
    todo.id = this.state.todoItems.length;
    this.setState({
      todoItems: [...this.state.todoItems, todo],
    });
  };

  toggleComplete = ({ id }) => {
    const newTodos = this.state.todoItems.map((todo) => {
      return {
        ...todo,
        complete: todo.id === id ? !todo.complete : todo.complete,
      };
    });
    this.setState({
      todoItems: newTodos,
    });
  };

  render() {
    return (
      <>
        <div>
          <h2>Todo List</h2>
          <TodoForm addItem={this.addItem} />
          <TodoItems
            items={this.state.todoItems}
            deleteItem={this.deleteItem}
            toggleComplete={this.toggleComplete}
          />
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </>
    );
  }
}
