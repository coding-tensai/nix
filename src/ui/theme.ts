import pc from "picocolors";

export const theme = {
  dir: (s: string) => pc.blue(s),
  file: (s: string) => s,
  success: (s: string) => pc.green(s),
  error: (s: string) => pc.red(s),
  warn: (s: string) => pc.yellow(s),
  info: (s: string) => pc.cyan(s),
};
