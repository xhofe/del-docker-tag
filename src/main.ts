import * as core from '@actions/core'
import { delTags } from './docker'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const username = core.getInput('username')
    const password = core.getInput('password')
    const token = core.getInput('token')
    const tags = core.getInput('tags')
    core.info(`Hello ${username}!`)
    await delTags(username, password, token, tags)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
