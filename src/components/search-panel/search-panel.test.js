import React from "react";
import { shallow } from "enzyme";

import SearchPanel from "./search-panel";

let data = {};
const setup = props => {
  return shallow(<SearchPanel {...props} />);
};

describe("SearchPanel: ", () => {
  beforeEach(() => {
    data = {
      term: "",
      onTermChange: jest.fn()
    };
  });

  test("renders without error", () => {
    const wrapper = setup(data);
    expect(wrapper.length).toBe(1);
  });

  test("search qilish u-n input borligini tekshirish", () => {
    const wrapper = setup(data);
    expect(wrapper.find("input[type='text']").length).toBe(1);
    const eventObj = { target: { value: "test" } };
    const input = wrapper
      .find("input[type='text']")
      .simulate("change", eventObj);
    expect(data.onTermChange).toHaveBeenCalled();
  });
});
