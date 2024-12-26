import 'dotenv/config'

export function getEnvironment(env: string): string {
  return process.env[env] ?? ''
}

export function getNumEnvironment(env: string): number {
  return Number(getEnvironment(env))
}
