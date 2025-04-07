import { render, waitFor, screen } from "@testing-library/react";
import Weather from "./weather";
import { vi } from "vitest";

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
describe("Weather Component", () => {
  it("should fetch and display weather data", async () => {
    const mockWeatherData = {
      name: "Bangalore",
      main: {
        temp: 25,
        humidity: 60,
      },
      weather: [
        {
          description: "clear sky",
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      json: async () => mockWeatherData,
    });

    render(<Weather />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Bangalore")).toBeInTheDocument();
      expect(screen.getByText("Temperature: 25°C")).toBeInTheDocument();
      expect(screen.getByText("Humidity: 60%")).toBeInTheDocument();
      expect(screen.getByText("Weather: clear sky")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const apiCallUrl = global.fetch.mock.calls[0][0];
    expect(apiCallUrl).toContain("lat=12.9716");
    expect(apiCallUrl).toContain("lon=77.5946");
  });

  it("should show error message when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("API error"));
  
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
      });
    });
  
    render(<Weather />);
  
    await waitFor(() => {
      expect(screen.getByText("Unable to fetch weather data.")).toBeInTheDocument();
    });
  });
  
});