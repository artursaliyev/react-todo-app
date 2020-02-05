import React, { Component } from "react";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  MAXID = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffe"),
      this.createTodoItem("Make Aweasome App"),
      this.createTodoItem("Have a lunch")
    ],
    term: "",
    filter: "active" //all, active, done
  };

  createTodoItem(label) {
    return {
      id: this.MAXID++,
      label,
      important: false,
      done: false
    };
  }

  findByIdReturnIndex(array, id) {
    return array.findIndex(item => item.id === id);
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(item => item.id === id);
      const newArray = [
        ...todoData.slice(0, indx),
        ...todoData.slice(indx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text = "") => {
    // create new item
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      // new array is old array and new item
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = this.findByIdReturnIndex(arr, id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onTermChange = (term = "") => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term === "") {
      return items;
    }
    return items.filter(item => {
      return item.label.toUpperCase().includes(term.toUpperCase());
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;
    const filteredData = this.filter(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />

        <div className="top-panel d-flex">
          <SearchPanel onTermChange={this.onTermChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={filteredData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
