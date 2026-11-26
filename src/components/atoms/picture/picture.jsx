import styles from "./Picture.module.css";

export default function Picture(props) {
  // Function, so it stays reactive if props.src changes
  const imgURL = () => `https://fdnd-agency.directus.app/assets/${props.src}`;

  return (
    <picture>
      <source
        srcset={`${imgURL()}?width=${props.width}&height=${props.height}&format=avif&quality=70`}
        type="image/avif"
      />

      <source
        srcset={`${imgURL()}?width=${props.width}&height=${props.height}&format=webp&quality=70`}
        type="image/webp"
      />

      <img
        src={`${imgURL()}?width=${props.width}&height=${props.height}&quality=60`}
        alt={props.alt}
        class={styles.image}
      />
    </picture>
  );
}