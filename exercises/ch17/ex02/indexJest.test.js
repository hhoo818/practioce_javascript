import { Octokit } from "@octokit/core";
import { closeIssue, createIssue, fetchIssue } from "./index.js";
jest.mock("@octokit/core");

describe("Github Isuue test", async () => {
  const mockRequest = jest.fn();
  const mockOctokit = {
    request: mockRequest,
  };
  beforeAll(() => {
    Octokit.mockImplementation(() => mockOctokit);
  });
  beforeEach(() => {
    mockRequest.mockClear();
  });

  test("POST", async () => {
    mockRequest.mockReturnValue({ data: { id: 1, title: "Test Issue" } });
  });
  await createIssue("Test Issue", "This is a test issue.");
  expect(mockRequest).toHaveBeenCalledWith(
    "POST /repos/{owner}/{repo}/issues",
    {
      owner: "hhoo818",
      repo: "practioce_javascript",
      title: "Test Issue",
      body: "This is a test issue.",
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    }
  );

  it("should send a PATCH request to close an issue", async () => {
    mockRequest.mockResolvedValue({ data: { id: 1, state: "closed" } });

    await closeIssue(1);

    expect(mockRequest).toHaveBeenCalledWith(
      "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: "hhoo818",
        repo: "practioce_javascript",
        issue_number: 1,
        state: "closed",
        headers: { "X-GitHub-Api-Version": "2022-11-28" },
      }
    );
  });

  it("should send a GET request to fetch issues", async () => {
    const mockIssues = [
      { id: 1, title: "Test Issue 1" },
      { id: 2, title: "Test Issue 2" },
    ];
    mockRequest.mockResolvedValue({ data: mockIssues });

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    await fetchIssue();

    expect(mockRequest).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/issues",
      {
        owner: "hhoo818",
        repo: "practioce_javascript",
        headers: { "X-GitHub-Api-Version": "2022-11-28" },
      }
    );

    // ログが出力されていることを確認
    expect(consoleLogSpy).toHaveBeenCalledWith("issue:1");
    expect(consoleLogSpy).toHaveBeenCalledWith("\tid:1");
    expect(consoleLogSpy).toHaveBeenCalledWith("\ttitle:Test Issue 1");

    consoleLogSpy.mockRestore();
  });
});
