import { Show, Switch, Match } from "solid-js";
import Picture from "../../atoms/picture/Picture";
import styles from "./InstrumentDetail.module.css";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Niet bekend";

export default function InstrumentDetail(props) {
    console.log(props)
  const statusClass = () =>
    props.instrument.status?.toLowerCase().replace(/\s+/g, "-") ?? "onbekend";

  return (
    <>
      <h1 class={styles.title}>{props.instrument.name}</h1>

      <section class={styles.section}>
        <h2 class={`${styles.status} ${styles[statusClass()] ?? ""}`}>
          {props.instrument.status ?? "Onbekend"}
        </h2>

        <Show when={props.instrument.status === "Uitgeleend"}>
          <dl>
            <div>
              <dt>Uitgeleend sinds:</dt>
              <dd>{formatDate(props.instrument.rented_from)}</dd>
            </div>

            <div>
              <dt>Uitgeleend door:</dt>
              <dd>{props.instrument.student_name ?? "Niet bekend"}</dd>
            </div>
          </dl>
        </Show>

        <dl>
          <div>
            <dt>Bergplaats:</dt>
            <dd>{props.instrument.storage_room ?? "Niet bekend"}</dd>
          </div>

          <div>
            <dt>Eigendom:</dt>
            <dd>{props.instrument.property ?? "Niet bekend"}</dd>
          </div>
        </dl>

        <div class={styles.actionButtons}>
          <Switch
            fallback={
              <button type="button" class="button primary" disabled>
                Onbeschikbaar
              </button>
            }
          >
            <Match when={props.instrument.status === "Uitgeleend"}>
              <a href={`/takeBack/${props.instrument.key}`} class="button primary">
                Innemen
              </a>
            </Match>
            <Match when={props.instrument.status === "Beschikbaar"}>
              <a href={`/loanOut/${props.instrument.key}`} class="button primary">
                Uitlenen
              </a>
            </Match>
          </Switch>

          <a href={`/damage/${props.instrument.key}`} class="button danger">
            Schade melden
          </a>
        </div>

        <h3 class={styles.detailsHeading}>Details</h3>

        <dl>
          <div>
            <dt>Type instrument:</dt>
            <dd>{props.instrument.instrument ?? "Niet bekend"}</dd>
          </div>

          <div>
            <dt>Serienummer:</dt>
            <dd>{props.instrument.serial_number ?? "Niet bekend"}</dd>
          </div>

          <div>
            <dt>Merk:</dt>
            <dd>{props.instrument.brand ?? "Niet bekend"}</dd>
          </div>
        </dl>

        <a href="#" class={`button secondary ${styles.editButton}`}>
          Aanpassen
        </a>

        <Show when={props.instrument.photo?.id}>
          <div class={styles.image}>
            <Picture
              src={props.instrument.photo.id}
              width="450"
              height="450"
              alt={props.instrument.name}
            />
          </div>
        </Show>
      </section>
    </>
  );
}