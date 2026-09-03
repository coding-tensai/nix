import { Command } from "commander";
import { buildTree, renderTree } from "../lib/tree-util.ts";
import { theme } from "../ui/theme.ts";

export function registerTreeCommand(program: Command) {
  program
    .command("tree [dir]")
    .description("Shows a directory as a tree")
    .action(async function (dir = ".") {
      try {
        const tree = await buildTree(dir);
        console.log(renderTree(tree, { dir: theme.dir, file: theme.file }));
      } catch (err) {
        console.error(theme.error(`Could not find "${dir}: ${(err as Error).message}"`));
        process.exitCode = 1;
      }
    });
}
