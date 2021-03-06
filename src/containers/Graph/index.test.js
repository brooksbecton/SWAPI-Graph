import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Graph from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("Graph", () => {
  it("renders", () => {
    const tree = shallow(<Graph />);
    expect(tree).toMatchSnapshot();
  });
});
