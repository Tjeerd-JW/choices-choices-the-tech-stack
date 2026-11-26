import { Title } from '@solidjs/meta';
import { For, createMemo } from 'solid-js';

const fetchInstruments = async () => {
  const res = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments');

  if (!res.ok) {
    throw new Error('alles ging de lucht in');
  }
  const response = await res.json();
  // console.log(response.data[0].name)

  return response.data;
};

export default function Home() {
  const instruments = createMemo(() => fetchInstruments());
  console.log("instruments" + { instruments })

  return (
    <main>
      <Title>Home - Solid App</Title>

      <h1>Alles gaat de lucht in ik zweer</h1>
      <ul>
        <For each={instruments()}>
          {(instrument) => (
            <li>
              <a href={`/instruments/${instrument.key}`}>
                {instrument.name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </main>
  );
}