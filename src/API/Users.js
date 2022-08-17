const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

async function getUsers(page = 1, count = 6) {
  return await fetch(BASE_URL + `users?page=${page}&count=${count}`, {
      method: 'GET',
      cache: 'default',
      headers: {
        "Connection": 'keep-alive',
      },
  })
}

async function getPositions() {
  return await fetch(BASE_URL + `positions`, {
    method: 'GET',
    cache: 'default',
    headers: {
      "Connection": 'keep-alive',
    },
  })
}

async function getToken() {
  return await fetch(BASE_URL + `token`, {
    method: 'GET',
    cache: 'default',
    headers: {
      "Connection": 'keep-alive',
    },
  })
}

async function postUser(token, body) {
  return await fetch(BASE_URL + `users`, {
    method: 'POST',
    cache: 'default',
    headers: {
      "Connection": 'keep-alive',
      "Token": token,
    },
    body,
  })
}

export {getUsers, getPositions, getToken, postUser};