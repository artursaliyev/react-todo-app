import React from "react";
import { shallow } from "enzyme";
import { findByClassName } from "../../../test/index";

import TodoListItem from "./todo-list-item";

const setup = props => {
  return shallow(<TodoListItem {...props} />);
};

let item = {};

beforeEach(() => {
  item = {
    label: "Drink Coffee",
    important: false,
    done: false,
    onToggleDone: jest.fn(),
    onToggleImportant: jest.fn(),
    onDeleted: jest.fn()
  };
});

test("renders without error", () => {
  const component = setup(item);
  expect(component.length).toBe(1);
});

test("done props true bulganda itemga 'done' classini borligi", () => {
  item.done = true;
  const wrapper = setup(item);
  expect(wrapper.find(".done").length).toBe(1);
});

test("done props false bulganda itemga 'done' classini yoqligi", () => {
  const wrapper = setup(item);
  expect(wrapper.find(".done").length).toBe(0);
});

test("important props true bulganda itemga 'important' classini borligi", () => {
  item.important = true;
  const wrapper = setup(item);
  expect(wrapper.find(".important").length).toBe(1);
});

test("important props false bulganda itemga 'important' classini yoqligi", () => {
  const wrapper = setup(item);
  expect(wrapper.find(".important").length).toBe(0);
});

test("onToggleDone eventi chaqirilganini tekshirish", () => {
  const wrapper = setup(item);
  const spanElement = findByClassName(wrapper, "todo-list-item-label");
  spanElement.simulate("click");

  // wrapper.find(".todo-list-item-label").simulate("click");
  expect(item.onToggleDone).toHaveBeenCalled();
});

test("onToggleImportant eventi chaqirilganini tekshirish", () => {
  const wrapper = setup(item);

  expect(wrapper.find("button").length).toBe(2);

  const button = wrapper.find("button").at(0);
  button.simulate("click");
  expect(item.onToggleImportant).toHaveBeenCalled();
});

test("onDelete eventi chaqirilganini tekshirish", () => {
  const wrapper = setup(item);

  expect(wrapper.find("button").length).toBe(2);

  const button = wrapper.find("button").at(1);
  button.simulate("click");
  expect(item.onDeleted).toHaveBeenCalled();
});
