export default async function instruments({params}) {
const { instrumentKey } = await params

    const response = await fetch(`https://fdnd-agency.directus.app/items/preludefonds_instruments?filter[key][_eq]=${instrumentKey}&fields=*.*&deep[log][_sort]=-date_created`
    );

    const data = await response.json();
    const instrument = data.data[0]
    return (
        <main>
        <h1>hoi</h1>

        <p>{instrument.name}</p>
        </main>

    )
}

