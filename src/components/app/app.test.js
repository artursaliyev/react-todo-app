import React from "react";
import { shallow, mount } from "enzyme";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import TodoListItem from "../todo-list-item";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import App from ".";

const MAXID = 100;
let todoData;

const setup = () => {
  return mount(<App />);
};

describe("App:", () => {
  beforeEach(() => {
    todoData = [
      {
        id: 100,
        label: "Drink Coffe",
        important: false,
        done: false
      },
      {
        id: 101,
        label: "Make Aweasome App",
        important: false,
        done: true
      },
      {
        id: 102,
        label: "Have a lunch",
        important: false,
        done: false
      }
    ];
  });

  test("renders without error", () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  test("snapshot without error", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test("renders inner components in App", () => {
    const app = setup();
    expect(app.find(AppHeader)).toHaveLength(1);
    expect(app.find(TodoList)).toHaveLength(1);
    expect(app.find(SearchPanel)).toHaveLength(1);
    expect(app.find(ItemStatusFilter)).toHaveLength(1);
    expect(app.find(ItemAddForm)).toHaveLength(1);
    expect(app.find(ItemAddForm)).toHaveLength(1);
  });

  test("add new item", () => {
    const wrapper = setup();
    expect(wrapper.find(TodoListItem)).toHaveLength(3);
    wrapper.find(".item-add-form").simulate("submit");
    expect(wrapper.find(TodoListItem)).toHaveLength(4);
    expect(wrapper.text()).toContain(`4 more to do, 0 done`);
  });

  test("delete item", () => {
    const wrapper = setup();
    expect(wrapper.find(TodoListItem)).toHaveLength(3);

    wrapper
      .find(TodoListItem)
      .at(0)
      .find("button")
      .at(1)
      .simulate("click");

    expect(wrapper.find(TodoListItem)).toHaveLength(2);
    expect(wrapper.text()).toContain(`2 more to do, 0 done`);

    wrapper
      .find(TodoListItem)
      .at(0)
      .find("button")
      .at(1)
      .simulate("click");
    expect(wrapper.find(TodoListItem)).toHaveLength(1);
    expect(wrapper.text()).toContain(`1 more to do, 0 done`);

    wrapper.find(".item-add-form").simulate("submit");
    expect(wrapper.find(TodoListItem)).toHaveLength(2);
  });

  test("initial all/active/done", () => {
    const wrapper = setup();
    expect(wrapper.find(ItemStatusFilter)).toHaveLength(1);
    expect(wrapper.find(ItemStatusFilter).find("button").length).toBe(3);
    wrapper
      .find(ItemStatusFilter)
      .find("button")
      .at(1)
      .simulate("click");

    // console.log(wrapper.debug());

    expect(wrapper.find(TodoListItem)).toHaveLength(3);

    wrapper
      .find(ItemStatusFilter)
      .find("button")
      .at(2)
      .simulate("click");

    expect(wrapper.find(TodoListItem)).toHaveLength(0);
  });

  test("filter all/active/done", () => {
    const wrapper = setup();
    wrapper.setState({
      todoData: todoData
    });
    expect(wrapper.find(ItemStatusFilter)).toHaveLength(1);
    expect(wrapper.find(ItemStatusFilter).find("button").length).toBe(3);
    wrapper
      .find(ItemStatusFilter)
      .find("button")
      .at(1)
      .simulate("click");

    // console.log(wrapper.debug());

    expect(wrapper.find(TodoListItem)).toHaveLength(2);

    wrapper
      .find(ItemStatusFilter)
      .find("button")
      .at(2)
      .simulate("click");

    expect(wrapper.find(TodoListItem)).toHaveLength(1);
  });

  test("item lardan biri done qolinganda header va itellar soni mos kelishi", () => {
    const wrapper = setup();
    expect(wrapper.find(".todo-list-item-label")).toHaveLength(3);
    wrapper
      .find(".todo-list-item-label")
      .at(0)
      .simulate("click");

    expect(wrapper.find(TodoListItem)).toHaveLength(2);
    expect(wrapper.text()).toContain(`2 more to do, 1 done`);

    wrapper.setState({
      filter: "done"
    });

    expect(wrapper.find(TodoListItem)).toHaveLength(1);
  });

  test("important item", () => {
    const wrapper = setup();
    expect(wrapper.find(TodoListItem)).toHaveLength(3);

    wrapper
      .find(TodoListItem)
      .at(0)
      .find("button")
      .at(0)
      .simulate("click");

    console.log(
      wrapper
        .find(TodoListItem)
        .at(0)
        .debug()
    );

    expect(
      wrapper
        .find(TodoListItem)
        .at(0)
        .prop("important")
    ).toBe(true);

    expect(
      wrapper
        .find(TodoListItem)
        .at(0)
        .find(".important")
    ).toBeTruthy;

    expect(
      wrapper
        .find(TodoListItem)
        .at(1)
        .prop("important")
    ).toBe(false);

    expect(
      wrapper
        .find(TodoListItem)
        .at(1)
        .find(".important")
    ).toBeFalsy;

    expect(
      wrapper
        .find(TodoListItem)
        .at(2)
        .prop("important")
    ).toBe(false);

    expect(
      wrapper
        .find(TodoListItem)
        .at(2)
        .find(".important")
    ).toBeFalsy;

    wrapper
      .find(TodoListItem)
      .at(0)
      .find("button")
      .at(0)
      .simulate("click");

    expect(
      wrapper
        .find(TodoListItem)
        .at(0)
        .prop("important")
    ).toBe(false);

    expect(
      wrapper
        .find(TodoListItem)
        .at(0)
        .find(".important")
    ).toBeFalsy;

    wrapper
      .find(TodoListItem)
      .at(1)
      .find("button")
      .at(0)
      .simulate("click");

    expect(
      wrapper
        .find(TodoListItem)
        .at(1)
        .prop("important")
    ).toBe(true);

    expect(
      wrapper
        .find(TodoListItem)
        .at(1)
        .find(".important")
    ).toBeTrusy;
  });

  test("search panel", () => {
    const wrapper = setup();
    expect(wrapper.find(TodoListItem)).toHaveLength(3);

    let fakeData = { target: { value: "coff" } };
    wrapper.find(".search-input").simulate("change", fakeData);
    expect(wrapper.find(TodoListItem)).toHaveLength(1);
    fakeData = { target: { value: "o" } };
    wrapper.find(".search-input").simulate("change", fakeData);
    expect(wrapper.find(TodoListItem)).toHaveLength(2);

    fakeData = { target: { value: "" } };
    wrapper.find(".search-input").simulate("change", fakeData);
    expect(wrapper.find(TodoListItem)).toHaveLength(3);
  });
});
