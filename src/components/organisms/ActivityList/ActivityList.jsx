import Image from "next/image";
import styles from "./ActivityList.module.css";

import Innemen from "@/assets/icons/innemen.svg";
import Uitlenen from "@/assets/icons/uitlenen.svg";
import Schade from "@/assets/icons/schade.svg";
import Onbekend from "@/assets/icons/onbekend.svg";

const icons = {
  innemen: Innemen,
  uitlenen: Uitlenen,
  schade: Schade,
  onbekend: Onbekend,
};

const timeFormat = new Intl.DateTimeFormat("nl-NL", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Amsterdam",
});

const dateFormat = new Intl.DateTimeFormat("nl-NL", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Amsterdam",
});

export default function ActivityLog({ log }) {
  return (
    <section className={styles.activities}>
      <h2 className={styles.heading}>Activiteiten</h2>

      {log.map((event) => {
        const date = new Date(event.date_created);

        return (
          <details key={event.id} className={styles.item}>
            <summary className={styles.summary}>
              <h3 className={styles.title}>
                <Image
                  className={styles.icon}
                  src={icons[event.type_action?.toLowerCase()] ?? Onbekend}
                  alt=""
                  width={25}
                  height={25}
                />
                {event.type_action ?? "onbekend"}
              </h3>
              <p className={styles.time}>
                {timeFormat.format(date)} {dateFormat.format(date)}
              </p>
            </summary>

            <div className={styles.content}>
              <dl className={styles.list}>
                <div className={styles.row}>
                  <dt className={styles.term}>Docent:</dt>
                  <dd>{event.performed_by ?? "Prelude"}</dd>
                </div>
                <div className={styles.row}>
                  <dt className={styles.term}>Student:</dt>
                  <dd>{event.involved_party ?? "Onbekend"}</dd>
                </div>
                <dt className={styles.term}>details:</dt>
                <dd>{event.note ?? "Geen details"}</dd>
              </dl>
            </div>
          </details>
        );
      })}
    </section>
  );
}