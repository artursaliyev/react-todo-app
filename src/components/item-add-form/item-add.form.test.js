import React from "react";
import { shallow } from "enzyme";

import ItemAddForm from "./item-add-form";

let data = {};

const setup = props => {
  return shallow(<ItemAddForm {...props} />);
};

describe("ItemAddForm: ", () => {
  beforeEach(() => {
    data = {
      onAdd: jest.fn()
    };
  });

  test("renders without error", () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  test("initial state", () => {
    const wrapper = setup();
    expect(wrapper.state()).toEqual({ label: "" });
  });

  test("change state.label", () => {
    const wrapper = setup();
    expect(wrapper.state()).toEqual({ label: "" });
    const eventObj = { target: { value: "test value" } };

    wrapper.find("input").simulate("change", eventObj);
    expect(wrapper.state()).toEqual({ label: "test value" });
  });

  test("submit form", () => {
    const wrapper = setup(data);
    const fakeEvent = {
      preventDefault: () => {
        console.info("preventDefault");
      }
    };

    wrapper.find("form").simulate("submit", fakeEvent);
    expect(data.onAdd).toHaveBeenCalled();
    expect(data.onAdd).toHaveBeenCalledTimes(1);
    expect(wrapper.state()).toEqual({ label: "" });
  });
});
