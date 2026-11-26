import styles from "./Picture.module.css";

export default function Picture({ src, width, height, alt }) {
    

    const imgURL = `https://fdnd-agency.directus.app/assets/${src}`;
    return (
        <picture>
            <source
            // srcSet is camelCase in React
                srcSet={`${imgURL}?width=${width}&height=${height}&format=avif&quality=70`}
                type="image/avif"
            />

            <source
                srcSet={`${imgURL}?width=${width}&height=${height}&format=webp&quality=70`}
                type="image/webp"
            />
            <img
                src={`${imgURL}?width=${width}&height=${height}&quality=60`}
                alt={alt}
                className={styles.image}
            />
        </picture>
    )
}