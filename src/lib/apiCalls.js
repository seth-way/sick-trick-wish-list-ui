export async function fetchAllTricks() {
  try {
    const res = await fetch('http://localhost:3001/api/v1/tricks');
    if (!res.ok) throw new Error('error fetching tricks.');
    const tricks = await res.json();
    return tricks;
  } catch (err) {
    console.error(err);
  }
}

export async function postTrick(trick) {
  try {
    const res = await fetch('http://localhost:3001/api/v1/tricks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trick),
    });
    if (!res.ok) throw new Error('error fetching tricks.');
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
