import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import About from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("About", () => {
  it("renders", () => {
    const tree = shallow(<About />);
    expect(tree).toMatchSnapshot();
  });
});
