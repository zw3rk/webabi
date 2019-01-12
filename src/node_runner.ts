import { configureFileSystem, Process } from "./index";
import * as process from "process";
import * as fs_ from "fs";

async function main(): Promise<void> {
  try {
    var args = process.argv.splice(process.execArgv.length + 2);

    if (args.length == 0) {
      console.log('Usage: node node_runner.js <wasm-executable-name>');
      process.exit(1);
    } else {
      const execName: string = args[0];
      const fs = await configureFileSystem({ devices: {} });
      process.exit((await Process.instantiateProcess(fs, execName)).start());
    }
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

main()
