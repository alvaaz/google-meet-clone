import { customAlphabet } from 'nanoid';
import { nolookalikes } from 'nanoid-dictionary';

export function generateCallID(length = 8) {
  const nanoid = customAlphabet(nolookalikes, length);
  return nanoid();
}

export async function getToken(roomId: string, identity: string) {
  try {
    const data = await fetch("https://jade-caiman-4432.twil.io/create-token", {
      method: 'POST',
      body: JSON.stringify({
        identity,
        room: roomId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await data.json();
  } catch (e) {
    console.error(e)
    return null
  }
}

export function trackpubsToTracks(trackMap: any) {
  // convert the map of track publications to an array of corresponding tracks
  return Array.from(trackMap.values())
    .map((publication: any) => publication.track)
    .filter((track) => track !== null);
}
