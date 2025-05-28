export async function fetchFn(url, method, body = null) {
  return await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export async function fetchGetFn(url, method) {
  return await fetch(url, {
    method: method,
  }).then((res) => res.json());
}
