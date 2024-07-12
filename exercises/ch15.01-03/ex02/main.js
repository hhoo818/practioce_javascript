document.getElementById("loadModule").addEventListener("click", async () => {
  try {
    const module = await import("./server.js");
    module.hello();
  } catch (error) {
    console.error("Error importing module:", error);
  }
});
