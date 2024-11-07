import { Command, program } from "commander";

const gat = ""; // アクセストークン

const createCommand = new Command()
  .command("create")
  .description("create an issue")
  .action(() => {
    const url = "https://api.github.com/repos/Yuki-Itoh/js-exercises/issues";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${gat}`,
      },
      body: JSON.stringify({ title: "研修課題" }),
    }).then((response) => {
      console.log("response:", response);
    });
  });

const closeCommand = new Command()
  .command("close")
  .description("close an issue")
  .option("-id, <id>", "select issue")
  .action((args) => {
    const url = `https://api.github.com/repos/Yuki-Itoh/js-exercises/issues/${args.Id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${gat}`,
      },
      body: JSON.stringify({ state: "closed" }),
    }).then((response) => {
      console.log("response:", response);
    });
  });

const listCommand = new Command()
  .command("list")
  .description("list open issues")
  .action(() => {
    const url = `https://api.github.com/repos/Yuki-Itoh/js-exercises/issues?state=open`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${gat}`,
      },
    }).then((response) => {
      response.json().then((issues) => {
        const simpleIssues = issues.map((issue) => {
          return { id: issue.number, title: issue.title, state: issue.state };
        });
        console.table(simpleIssues);
      });
    });
  });

program
  .addCommand(createCommand)
  .addCommand(closeCommand)
  .addCommand(listCommand)
  .parse(process.argv);
