import React from "react";
import { shallow, mount } from "enzyme";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import App from ".";

const setup = () => {
  return mount(<App />);
};

describe("App:", () => {
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
});
