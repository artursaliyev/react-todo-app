import React from "react";
import { shallow } from "enzyme";

import AppHeader from "./app-header";

const setup = props => {
  return shallow(<AppHeader {...props} />);
};

describe("AppHeader", () => {
  it("reners with error", () => {
    const component = setup();
    expect(component.length).toBe(1);
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  it("reners 3 todo ad 5 done tast", () => {
    const props = { toDo: 3, done: 5 };
    const component = setup(props);
    expect(component.text()).toContain(`3 more to do, 5 done`);
  });

  it("reners 5 todo ad 15 done tast", () => {
    const props = { toDo: 5, done: 15 };
    const component = setup(props);
    expect(component.text()).toContain(`5 more to do, 15 done`);
  });

  it("reners 50 todo ad 150 done tast", () => {
    const props = { toDo: 5, done: 150 };
    const component = setup(props);
    expect(component.text()).not.toContain(`12 more to do, 150 done`);
  });
});
