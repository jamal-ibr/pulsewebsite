/* Minimal coloured logger — no deps. */
const codes = {
  reset: '\x1b[0m',
  grey: '\x1b[90m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  green: '\x1b[32m',
};

function stamp() {
  return new Date().toISOString().slice(11, 19);
}

function write(colour: keyof typeof codes, level: string, msg: string) {
  process.stderr.write(
    `${codes.grey}${stamp()}${codes.reset} ${codes[colour]}${level}${codes.reset} ${msg}\n`,
  );
}

export const log = {
  info: (m: string) => write('cyan', 'info ', m),
  warn: (m: string) => write('yellow', 'warn ', m),
  error: (m: string) => write('red', 'error', m),
  ok: (m: string) => write('green', 'ok   ', m),
  debug: (m: string) => {
    if (process.env.DEBUG) write('grey', 'debug', m);
  },
};
