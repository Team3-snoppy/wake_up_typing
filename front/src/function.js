export async function fetchWithBody(url, method, body = {}) {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return {
    status: res.status,
    ok: res.ok,
    data: data.data,
  };
}

export async function fetchWithoutBody(url, method) {
  const res = await fetch(url, {
    method: method,
  });
  const data = await res.json();
  return {
    status: res.status,
    ok: res.ok,
    data: data.data,
  };
}
