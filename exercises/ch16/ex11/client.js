import { createConnection } from "net";

const createClient = (id) => {
  createConnection({ port: 3000 }, () =>
    console.log(`socket ${id} is created.`)
  );
};

for (let i = 1; i <= 40000; i++) {
  createClient(i);
}
