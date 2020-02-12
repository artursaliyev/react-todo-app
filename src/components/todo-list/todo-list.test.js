import React from "react";
import { shallow } from "enzyme";
import { findByClassName } from "../../../test/index";

import TodoList from "./todo-list";
import TodoListItem from "../todo-list-item";

const setup = props => {
  return shallow(<TodoList {...props} />);
};
const data = {
  todos: [
    {
      id: 1,
      label: "Drinct Coffee",
      important: false,
      done: false
    },
    {
      id: 2,
      label: "Build React App",
      important: false,
      done: false
    },
    {
      id: 3,
      label: "Slepping",
      important: false,
      done: false
    }
  ],
  onDeleted: jest.fn(),
  onToggleImportant: jest.fn(),
  onToggleDone: jest.fn()
};

test("renders without error", () => {
  const wrapper = setup(data);
  expect(wrapper.length).toBe(1);
});

test("renders three items", () => {
  const wrapper = setup(data);
  expect(wrapper.find(TodoListItem).length).toBe(3);
  expect(wrapper.find(".list-group-item").length).toBe(3);
});

test("renders 'no items ' where items=[]", () => {
  data.todos = [];
  const wrapper = setup(data);
  expect(wrapper.find(TodoListItem).length).toBe(0);
  expect(wrapper.find(".list-group-item").length).toBe(0);
  expect(wrapper.text()).toBe("no items");
});
