export type TreeNode = {
  name: string
  path: string
  isDirectory: boolean
  size: number
  modifiedAt: Date
  children?: TreeNode[]
}

export type ScanResult = {
  totalFiles: number
  totalDirs: number
  byExtension: Record<string, number>
}

export type SearcMatch = Pick<TreeNode, "name" | "path" | "isDirectory">