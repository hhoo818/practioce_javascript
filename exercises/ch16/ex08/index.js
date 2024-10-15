import { Command } from "commander"; // Commanderのimportを修正
import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "hhoo818";
const REPO = "practioce_javascript";
let isVerbose = false;

const octokit = new Octokit({
  auth: TOKEN,
});

const createIssue = async (title, body) => {
  try {
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: OWNER,
        repo: REPO,
        title: title || "",
        body: body || "",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    if (isVerbose) {
      console.log(response);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

const closeIssue = async (id) => {
  try {
    const response = await octokit.request(
      "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: OWNER,
        repo: REPO,
        issue_number: id,
        state: "closed",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    if (isVerbose) {
      console.log(response);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

const fetchIssue = async () => {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: OWNER,
      repo: REPO,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const issues = response.data;
    issues.forEach((issue, index) => {
      console.log(`issue:${index + 1}`);
      console.log(`\tid:${issue.id}`);
      console.log(`\ttitle:${issue.title}`);
    });
    if (isVerbose) {
      console.log(response);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

const program = new Command();

program
  .name("github-issue-manager")
  .description("CLI to manage GitHub issues")
  .version("1.0.0");

program
  .command("create")
  .description("Create a new issue")
  .action((args) => {
    const [title, body] = args; // 引数を処理
    createIssue(title, body);
  });

program
  .command("close")
  .description("Close an issue by its number")
  .action((args) => {
    const [id] = args;
    closeIssue(id);
  });

program
  .command("list")
  .description("List open issues")
  .action(() => {
    fetchIssue();
  });

program.option("-v, --verbose", "Show HTTP logs").action(() => {
  isVerbose = true;
});

program.parse(process.argv);

if (program.opts().verbose) {
  isVerbose = true;
}
