import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";
import React from "react";

beforeAll(() => {
    global.navigator.geolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude: 12.9716,
            longitude: 77.5946,
          },
        })
      ),
    };
  });
  
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });

describe("Äpp",()=>{
    it("Should render app",()=>{
        render(<App/>);
        const heading=screen.getByText("Weather App");
        expect(heading).toBeInTheDocument();
    })
})