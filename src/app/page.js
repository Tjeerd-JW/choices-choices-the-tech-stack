import Link from "next/link";

export default async function Home() {
  const response = await fetch("https://fdnd-agency.directus.app/items/preludefonds_instruments");

  const instruments = await response.json();
  console.log(instruments)
  return (
    <main>
      <h1>Instruments</h1>
      {instruments.data.map((instrument) => (
        <li key={instrument.key}>
          <Link href={`/instruments/${instrument.key}`}>
            {instrument.name}

          </Link>
        </li>
      ))
      }
    </main >
  );
}
