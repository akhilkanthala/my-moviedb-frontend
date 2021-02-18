import Card from "../components/Card";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
// import {  configure } from "enzyme";
import { render, waitForElement } from "@testing-library/react";
// configure({ adapter: new Adapter() });
jest.mock("../react-auth0-spa/react-auth0-spa", () => ({
  useAuth0: jest.fn().mockImplementation(() => ({
    user: {
      id: 1
    }
  }))
}));
const axios = {
  post: jest.fn(() => Promise.resolve({ data: {} }))
};
describe("Card", () => {
  const res = {
    original_title: "Ready Player One",
    overview: "movie on virtual reality",
    vote_average: "9.5"
  };
  const type = "movie";

  it("displays a card", async () => {
    const { container, getByTestId } = render(<Card res={res} type={type} />);
    await waitForElement(() => getByTestId("rating"));
    await waitForElement(() => getByTestId("title"));
    await waitForElement(() => getByTestId("poster"));
    await waitForElement(() => getByTestId("overview"));
    expect(getByTestId("title")).toBeDefined();
    expect(getByTestId("poster")).toBeDefined();
    expect(getByTestId("rating")).toBeDefined();
    expect(getByTestId("overview")).toBeDefined();
  });
  // it("localhost api",async()=>{
  //  await axios.post.mockImplementationOnce(()=>
  //   Promise.resolve().then(res=>console.log(res)).catch(err=>console.log(err))
    
  //   )
  // })
});
