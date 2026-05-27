import { spawn } from 'node:child_process'

const [, , ...args] = process.argv
const env = { ...process.env }

delete env.NO_COLOR

const command = process.platform === 'win32' ? 'playwright.cmd' : 'playwright'
const child = spawn(command, args, {
  env,
  stdio: 'inherit',
})

child.on('error', (error) => {
  console.error(error)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})
