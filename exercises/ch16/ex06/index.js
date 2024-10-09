import { truncate } from "fs";

truncate("hello.txt", 100, (err) => {
  if (err) throw err;
});
