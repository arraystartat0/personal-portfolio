import { contact } from "../data/contact";
import ds from "../styles/design.module.css";
import Reveal from "./motion/Reveal";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={`${ds.section} ${styles.section}`}>
      <Reveal className={styles.kicker}>{contact.kicker}</Reveal>

      <Reveal as="h2" className={styles.headline} delayIndex={1}>
        {contact.headline.lead}
        <span className={styles.headlineAccent}>{contact.headline.accent}</span>
      </Reveal>

      <div className={styles.channels}>
        {contact.channels.map((channel, index) => (
          <Reveal key={channel.label} delayIndex={index}>
            <div className={styles.label}>{channel.label}</div>
            <a
              href={channel.href}
              className={`${ds.underline} ${styles.value} ${
                channel.label === "EMAIL" ? styles.valueBreak : ""
              }`}
              {...(channel.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {channel.value}
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
