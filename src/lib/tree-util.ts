import { promises as fs } from "node:fs";
import * as path from "node:path";
import type {TreeNode}  from "../types.ts"

const IGNORED = new Set([".git", "node_modules"]);

/*
 * Build a nested treeNode structure for directory, recursively.
 */
export async function buildTree(dirPath: string) {
  const stats = await fs.stat(dirPath);

  const node: TreeNode = {
    name: path.basename(path.resolve(dirPath)),
    path: dirPath,
    isDirectory: stats.isDirectory(),
    size: stats.size,
    modifiedAt: stats.mtime,
  };

  if (!node.isDirectory) return node;

  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const children = [];

  for (const entry of entries) {
    if (IGNORED.has(entry.name)) continue;

    const childPath = path.join(dirPath, entry.name);
    children.push(await buildTree(childPath));``
  }

  children.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
    return a.name.localeCompare(b.name);

  });
  
  
  node.children = children;
  return node;
}


export type TreeColorFncs = {
  dir?: (s: string) => string
  file?: (s: string) => string
}


export function renderTree(node: TreeNode, colorFnc: TreeColorFncs, prefix = "", isRoot = true) {
  const dirColor = colorFnc.dir ?? ((s) => s);
  const fileColor = colorFnc.file ?? ((s) => s);

  const lines = [];
  if (isRoot) lines.push(dirColor(node.name));

  const children = node.children ?? [];
  children.forEach((child, i) => {
    const isLast = i == children.length - 1;
    const connector = isLast ? "└── " : "├── ";

    const label = child.isDirectory
      ? dirColor(child.name)
      : fileColor(child.name);
    lines.push(prefix + connector + label); // add the icons

    if (child.children) {
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      const rendered = renderTree(child, colorFnc, childPrefix, false)

      if(rendered) lines.push(rendered)
    }
  });

  return lines.join("\n");
}
