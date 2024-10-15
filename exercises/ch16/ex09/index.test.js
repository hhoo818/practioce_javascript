import request from "supertest";
import { serve } from "./index.js";
import { join } from "path";
import { writeFileSync, unlinkSync } from "fs";

// テスト用にサーバーを作成
const app = serve("test_files", 3000); // 'test_files' はテスト用ファイルのディレクトリ

describe("Express Server Tests", () => {
  it("should respond to /test/mirror with method, url, and headers", async () => {
    const response = await request(app)
      .get("/test/mirror")
      .set("Test-Header", "TestValue")
      .send("Test Body");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("GET /test/mirror HTTP/");
    expect(response.text).toContain("test-header: TestValue");
    expect(response.text).toContain("Test Body");
  });

  it("should return 404 for non-existing file", async () => {
    const response = await request(app).get("/non-existing-file.txt");
    expect(response.statusCode).toBe(404);
  });

  it("should serve an existing .txt file", async () => {
    const testFilePath = join(__dirname, "test_files", "test.txt");
    writeFileSync(testFilePath, "This is a test file.");

    const response = await request(app).get("/test.txt");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("This is a test file.");

    // テストが終わった後ファイルを削除
    unlinkSync(testFilePath);
  });

  it("should serve an existing .html file", async () => {
    const testFilePath = join(__dirname, "test_files", "index.html");
    writeFileSync(testFilePath, "<html><body>Hello</body></html>");

    const response = await request(app).get("/index.html");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe("text/html");
    expect(response.text).toContain("<html><body>Hello</body></html>");

    // テスト後ファイルを削除
    unlinkSync(testFilePath);
  });
});
