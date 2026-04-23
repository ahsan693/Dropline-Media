"use client";

import WordReveal from "../ui/WordReveal";
import styles from "./descriptionroar.module.css";

export default function DescriptionRoar() {
  const text1 =
    "We've worked on campaigns for global brands in leading agencies, sitting through layers, meetings, and noise, and realised real growth does not come from complexity, it comes from clarity and execution.";

  const text2 =
    "We built Dropline Media to cut through that. No corporate bloat, no guesswork, just high-performing creative and design paired with focused strategy and campaigns built to scale.";

  const text3 =
    "From local businesses to growing brands, we deliver work that turns attention into real revenue.";

  return (
    <section className={`${styles.section} bg-black`}>
      <div className="mx-auto w-full max-w-full lg:max-w-[120rem]">
        <div className={`${styles.container} mx-auto text-left text-white flex flex-col`}>
          <p className={`${styles.paragraph} text-[60px] leading-[1.2] tracking-[1px]`}>
            <WordReveal text={text1} />
          </p>

          <p className={`${styles.paragraph} text-[60px] leading-[1.2] tracking-[1px]`}>
            <WordReveal text={text2} />
          </p>

          <p className={`${styles.paragraph} text-[60px] leading-[1.2] tracking-[1px]`}>
            <WordReveal text={text3} />
          </p>
        </div>
      </div>
    </section>
  );
}
