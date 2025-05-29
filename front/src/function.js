export async function fetchWithBody(url, method, body = {}) {
  return await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export async function fetchWithoutBody(url, method) {
  return await fetch(url, {
    method: method,
  }).then((res) => res.json());
}
