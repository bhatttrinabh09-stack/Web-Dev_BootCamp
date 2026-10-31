// ==============================================================================
// Topic 01 Starter: System Diagnostics & Word Counter CLI
// Run with: node cli.js --help
// ==============================================================================

import os from 'node:os';

const args = process.argv.slice(2);

// TODO 1: Check if args is empty -> print help guide and process.exit(1)

// TODO 2: If args[0] === '--info':
//         Print Node.js version (process.version)
//         Print OS platform (os.platform())
//         Print Total Memory in MB (os.totalmem())

// TODO 3: If args[0] === '--count':
//         Extract remaining words: args.slice(1)
//         If no words provided, print error and process.exit(1)
//         Count words and total characters (excluding spaces)
//         Print result formatted cleanly.

// TODO 4: Default case -> Unknown flag, print help and process.exit(1)
console.log("TODO: Implement CLI logic in cli.js");
