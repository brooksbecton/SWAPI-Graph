import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders", () => {
    const tree = shallow(<App />);
    expect(tree).toMatchSnapshot();
  });
});
