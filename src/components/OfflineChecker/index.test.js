import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import OfflineChecker from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("<OfflineChecker/>", () => {
  it("renders correctly if online", () => {
    expect(shallow(<OfflineChecker />)).toMatchSnapshot();
  });
});
