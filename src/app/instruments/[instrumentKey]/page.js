import Picture from "@/components/atoms/Picture/Picture";
import InstrumentDetail from "@/components/organisms/InstrumentDetail/InstrumentDetail";
import ActivityLog from "@/components/organisms/ActivityList/ActivityList";

export default async function instruments({ params }) {
    const { instrumentKey } = await params

    const response = await fetch(`https://fdnd-agency.directus.app/items/preludefonds_instruments?filter[key][_eq]=${instrumentKey}&fields=*.*&deep[log][_sort]=-date_created`
    );

    const data = await response.json();
    const instrument = data.data[0]
    return (
        <main>
            <InstrumentDetail
                instrument={instrument}
            />
    <ActivityLog
    log={instrument.log}
    />
        </main>

    )
}

