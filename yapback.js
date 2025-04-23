const yapBack = async (msg) => {
  const res = await fetch('http://localhost:3000/api/yap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  return data.response || 'yapgpt broke again 😭';
}
