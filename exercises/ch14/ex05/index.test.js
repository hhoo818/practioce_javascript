import { getTypeOfTemplateLiteral } from "./index.js";

test("test", () => {
  expect(getTypeOfTemplateLiteral`${"A"}`).toBe("string");
  expect(getTypeOfTemplateLiteral`${{ x: 1 }}`).toBe("object");
});
