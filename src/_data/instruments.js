
export default async function () {
    const res = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments?fields=*.*&deep[log][_sort]=-date_created&limit=10');


    const response = await res.json();

    return response.data;
}

