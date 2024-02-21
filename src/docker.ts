import * as core from '@actions/core'

const BASE_URL = 'https://hub.docker.com/v2'

export async function getToken(username: string, password: string) {
  core.info(`get token for ${username}`)
  const resp = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (resp.status !== 200) {
    throw new Error(`Failed to get token: ${resp.statusText}`)
  }
  const data = await resp.json()
  return data.token as string
}

export async function delTag(tag: string, token: string) {
  core.info(`delete tag: ${tag}`)
  const [repo, tagname] = tag.split(':')
  const resp = await fetch(
    `${BASE_URL}/repositories/${repo}/tags/${tagname}/`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (!resp.ok) {
    throw new Error(`Failed to delete tag: ${resp.statusText}`)
  }
  core.info(`✅ tag ${tag} deleted`)
  return resp
}

export async function delTags(
  username: string,
  password: string,
  token: string,
  tags: string
) {
  if (!token) {
    token = await getToken(username, password)
    if (!token) {
      throw new Error('Failed to get token')
    }
  }
  const tagList = tags.split('\n')
  for (const tag of tagList) {
    await delTag(tag, token)
  }
}
