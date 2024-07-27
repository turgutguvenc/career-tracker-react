import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import { fetchEvents } from "../hooks/useEvents"; // Import fetchEvents, not useEvents

const mock = new axiosMockAdapter(axios);

describe("fetchEvents", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch events and return data with status 200", async () => {
    const mockData = { events: [{ id: 1, name: "Event 1" }] };
    mock
      .onGet("https://job-tracker1-9ef445b4f214.herokuapp.com/events?page=1")
      .reply(200, mockData);

    const data = await fetchEvents(1);
    expect(data).toEqual(mockData);
  });

  it("should handle errors", async () => {
    mock
      .onGet("https://job-tracker1-9ef445b4f214.herokuapp.com/events?page=1")
      .reply(500);

    await expect(fetchEvents(1)).rejects.toThrow();
  });
});
