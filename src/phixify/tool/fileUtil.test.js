import { normalizePath } from "./fileUtil.js";

test("tests normalizePath", () => {
  expect(normalizePath(" ./test/dir ")).toBe("./test/dir/");
});
