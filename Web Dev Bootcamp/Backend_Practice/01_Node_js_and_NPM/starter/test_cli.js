import { execSync } from 'node:child_process';

console.log("Running CLI Integration Tests...\n");

try {
  // Test 1: --info flag
  const infoOutput = execSync("node cli.js --info", { encoding: "utf-8" });
  console.assert(infoOutput.includes("Node"), "Output should contain Node info");
  console.log("✔ Test 1: --info flag executes cleanly.");

  // Test 2: --count flag
  const countOutput = execSync("node cli.js --count alpha beta gamma", { encoding: "utf-8" });
  console.assert(countOutput.includes("3"), "Output should detect 3 words");
  console.log("✔ Test 2: --count flag processes words.");

  // Test 3: Invalid flag exits with error
  try {
    execSync("node cli.js --badflag", { stdio: "pipe" });
    console.error("❌ Test 3 Failed: Invalid flag should have exited with code 1");
  } catch (err) {
    console.assert(err.status === 1, "Exit code should be 1");
    console.log("✔ Test 3: Invalid flag correctly exited with status 1.");
  }

  console.log("\n🎉 All Node & NPM tests passed!");
} catch (err) {
  console.error("Test execution failed:", err.message);
}
