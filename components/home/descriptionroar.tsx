"use client";

import React, { useRef } from "react";
import WordReveal from "../ui/WordReveal";
import styles from "./descriptionroar.module.css";

export default function DescriptionRoar() {
  const p1Ref = useRef<HTMLElement | null>(null);
  const p2Ref = useRef<HTMLElement | null>(null);
  const p3Ref = useRef<HTMLElement | null>(null);

  const text1 =
    "We've worked on campaigns for global brands in leading agencies, sitting through layers, meetings, and noise, and realised real growth does not come from complexity, it comes from clarity and execution.";

  const text2 =
    "We built Dropline Media to cut through that. No corporate bloat, no guesswork, just high-performing creative and design paired with focused strategy and campaigns built to scale.";

  const text3 =
    "From local businesses to growing brands, we deliver work that turns attention into real revenue.";

  return (
    <section className="bg-black mt-0 pt-0 pb-20 lg:-mt-[28.125rem] lg:pb-[5rem]">
      <div className="mx-auto w-full max-w-full lg:max-w-[120rem]">
        <div className="mx-auto max-w-[61.25rem] px-[20px] pt-[100px] pb-[20px] text-left text-white flex flex-col gap-10">
          <p ref={p1Ref} className="text-[60px] leading-[1.2] font-medium tracking-[1px]">
            <WordReveal text={text1} targetRef={p1Ref} />
          </p>

          <p ref={p2Ref} className="mt-10 text-[60px] leading-[1.2] font-medium tracking-[1px]">
            <WordReveal text={text2} targetRef={p2Ref} />
          </p>

          <p ref={p3Ref} className="mt-10 text-[60px] leading-[1.2] font-medium tracking-[1px]">
            <WordReveal text={text3} targetRef={p3Ref} />
          </p>
        </div>
      </div>
    </section>
  );
}
