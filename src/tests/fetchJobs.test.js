import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchJobs } from "../hooks/useJobs";

const mock = new MockAdapter(axios);

describe("fetchJobs", () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  afterEach(() => {
    mock.reset();
  });

  it("should fetch jobs and return data with status 200", async () => {
    const mockData = { jobs: [{ id: 1, title: "Job 1" }] };
    mock
      .onGet("https://job-tracker1-9ef445b4f214.herokuapp.com/jobs?page=1")
      .reply(200, mockData);

    const data = await fetchJobs(1);
    expect(data).toEqual(mockData);
  });

  it("should handle errors", async () => {
    mock
      .onGet("https://job-tracker1-9ef445b4f214.herokuapp.com/jobs?page=1")
      .reply(500);

    await expect(fetchJobs(1)).rejects.toThrow();
  });
});
