import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FsPersister from "@pollyjs/persister-fs";
import path from "path";
import { createIssue, closeIssue, fetchIssue } from "./yourModuleFile"; // ファイル名を適宜変更

// Pollyのセットアップ
Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

describe("GitHub Issue Manager with Polly", () => {
  let polly;

  beforeAll(() => {
    polly = new Polly("GitHub Issue Manager", {
      adapters: ["node-http"],
      persister: "fs",
      // 記録ファイルの保存場所を指定
      persisterOptions: {
        fs: {
          recordingsDir: path.resolve(__dirname, "./recordings"), // 保存ディレクトリ
        },
      },
      mode: "replay", // デフォルトではリプレイモードに設定
      recordIfMissing: true, // 記録がない場合は新たに記録
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  test("createIssue should create a new issue", async () => {
    const title = "Test Issue";
    const body = "This is a test issue created for testing purposes.";
    await createIssue(title, body);
    // 必要に応じて、期待されるAPIの呼び出しや返り値の確認をここで実施
  });

  test("closeIssue should close an issue by ID", async () => {
    const issueId = 1; // 実際のissue IDに応じて変更
    await closeIssue(issueId);
    // 期待される動作が実行されたかの検証
  });

  test("fetchIssue should retrieve open issues", async () => {
    await fetchIssue();
    // 取得したデータの検証
  });
});
