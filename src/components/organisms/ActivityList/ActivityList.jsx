import { For } from "solid-js";
import styles from "./ActivityList.module.css";

import Innemen from "../../../assets/icons/innemen.svg";
import Uitlenen from "../../../assets/icons/uitlenen.svg";
import Schade from "../../../assets/icons/schade.svg";
import Onbekend from "../../../assets/icons/onbekend.svg";

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

export default function ActivityLog(props) {
  console.log(props)
  return (
    <section class={styles.activities}>
      <h2 class={styles.heading}>Activiteiten</h2>

      <For each={props.log}>
        {(event) => {
          const date = () => new Date(event().date_created);

          return (
            <details class={styles.item}>
              <summary class={styles.summary}>
                <h3 class={styles.title}>
                  <img
                    class={styles.icon}
                    src={icons[event().type_action?.toLowerCase()] ?? Onbekend}
                    alt=""
                    width="25"
                    height="25"
                  />
                  {event().type_action ?? "onbekend"}
                </h3>
                <p class={styles.time}>
                  {timeFormat.format(date())} {dateFormat.format(date())}
                </p>
              </summary>

              <div class={styles.content}>
                <dl class={styles.list}>
                  <div class={styles.row}>
                    <dt class={styles.term}>Docent:</dt>
                    <dd>{event().performed_by ?? "Prelude"}</dd>
                  </div>
                  <div class={styles.row}>
                    <dt class={styles.term}>Student:</dt>
                    <dd>{event().involved_party ?? "Onbekend"}</dd>
                  </div>
                  <div class={styles.row}>
                    <dt class={styles.term}>Details:</dt>
                    <dd>{event().note ?? "Geen details"}</dd>
                  </div>
                </dl>
              </div>
            </details>
          );
        }}
      </For>
    </section>
  );
}