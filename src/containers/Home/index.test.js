import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Home from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("Home", () => {
  it("renders", () => {
    const window = {};
    const tree = shallow(<Home />);
    expect(tree).toMatchSnapshot();
  });
});
