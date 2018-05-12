import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TopNav from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("TopNav", () => {
  it("renders", () => {
    const tree = shallow(<TopNav />);
    expect(tree).toMatchSnapshot();
  });
});
