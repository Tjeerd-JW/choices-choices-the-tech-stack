
import Link from "next/link";
import Picture from "@/components/atoms/Picture/Picture";
import styles from "./InstrumentDetail.module.css";

export default function InstrumentDetail({ instrument }) {
  // Create a CSS-friendly status name
  const statusClass =
    instrument.status?.toLowerCase().replace(/\s+/g, "-") ?? "onbekend";

  return (
    <>
      <h1 className={styles.title}>
        {instrument.name}
      </h1>

      <section className={styles.section}>

        {/* Instrument status */}
        <h2 className={`${styles.status} ${styles[statusClass] ?? ""}`}>
          {instrument.status ?? "Onbekend"}
        </h2>

        {/* Rental information */}
        {instrument.status === "Uitgeleend" && (
          <dl>
            <div>
              <dt>Uitgeleend sinds:</dt>
              <dd>
                {instrument.rented_from
                  ? new Date(instrument.rented_from).toLocaleDateString(
                      "nl-NL",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "Niet bekend"}
              </dd>
            </div>

            <div>
              <dt>Uitgeleend door:</dt>
              <dd>{instrument.student_name ?? "Niet bekend"}</dd>
            </div>
          </dl>
        )}

        {/* Storage and ownership */}
        <dl>
          <div>
            <dt>Bergplaats:</dt>
            <dd>{instrument.storage_room ?? "Niet bekend"}</dd>
          </div>

          <div>
            <dt>Eigendom:</dt>
            <dd>{instrument.property ?? "Niet bekend"}</dd>
          </div>
        </dl>

        {/* Action buttons */}
        <div className={styles.actionButtons}>

          {instrument.status === "Uitgeleend" ? (
            <Link
              href={`/takeBack/${instrument.key}`}
              className="button primary"
            >
              Innemen
            </Link>
          ) : instrument.status === "Beschikbaar" ? (
            <Link
              href={`/loanOut/${instrument.key}`}
              className="button primary"
            >
              Uitlenen
            </Link>
          ) : (
            <button
              type="button"
              className="button primary"
              disabled
            >
              Onbeschikbaar
            </button>
          )}

          <Link
            href={`/damage/${instrument.key}`}
            className="button danger"
          >
            Schade melden
          </Link>
        </div>

        {/* Instrument details */}
        <h3 className={styles.detailsHeading}>
          Details
        </h3>

        <dl>
          <div>
            <dt>Type instrument:</dt>
            <dd>{instrument.instrument ?? "Niet bekend"}</dd>
          </div>

          <div>
            <dt>Serienummer:</dt>
            <dd>{instrument.serial_number ?? "Niet bekend"}</dd>
          </div>

          <div>
            <dt>Merk:</dt>
            <dd>{instrument.brand ?? "Niet bekend"}</dd>
          </div>
        </dl>

        <Link
          href="#"
          className={`button secondary ${styles.editButton}`}
        >
          Aanpassen
        </Link>

        {/* Instrument picture */}
        {instrument.photo?.id && (
          <div className={styles.image}>
            <Picture
              src={instrument.photo.id}
              width="450"
              height="450"
              alt={instrument.name}
            />
          </div>
        )}

      </section>
    </>
  );
}
