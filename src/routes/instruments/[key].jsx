import { Title } from '@solidjs/meta';
import { createMemo, Loading } from 'solid-js';
import { useParams } from '@solidjs/router';
import InstrumentDetail from '../../components/organisms/InstrumentDetail/InstrumentDetail';
import ActivityLog from '../../components/organisms/ActivityList/ActivityList';

const fetchInstrument = async (key) => {
    const res = await fetch(
        `https://fdnd-agency.directus.app/items/preludefonds_instruments?filter[key][_eq]=${encodeURIComponent(key)}&fields=*.*&deep[log][_sort]=-date_created`
    );

    if (!res.ok) {
        throw new Error('alles ging de lucht in');
    }

    const response = await res.json();
    return response.data[0];
};

export default function InstrumentPage() {
    const params = useParams();
    const instrument = createMemo(() => fetchInstrument(params.key));

    return (
        <Loading fallback={<p>Laden...</p>}>
            <Title>{instrument().name}</Title>
            <InstrumentDetail
            instrument={instrument()}
            />

            <ActivityLog
            log={instrument().log}
            />
        </Loading>
    );
}