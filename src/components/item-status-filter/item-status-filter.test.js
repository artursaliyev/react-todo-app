import React from "react";
import { shallow } from "enzyme";

import ItemStatusFilter from "./item-status-filter";

let data = {};
const setup = props => {
  return shallow(<ItemStatusFilter {...props} />);
};

describe("ItemStatusFilter: ", () => {
  beforeEach(() => {
    data = {
      filter: null,
      onFilterChange: jest.fn()
    };
  });

  test("renders without error", () => {
    const wrapper = setup(data);
    expect(wrapper.length).toBe(1);
  });

  test("buttonlardan birini bosganda onFilterChange chaqirilganini tekshirish", () => {
    const wrapper = setup(data);
    expect(wrapper.find("button").length).toBe(3);
    const buttonAll = wrapper
      .find("button")
      .at(0)
      .simulate("click");
    expect(data.onFilterChange).toHaveBeenCalled();
  });
});
