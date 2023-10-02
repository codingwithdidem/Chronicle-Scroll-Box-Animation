"use client";

import { Workflow } from "../components/Workflow";
import { Box } from "../components/Box";
import { boxes } from "@/boxData";
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export default function Home() {
  const targetRef = useRef(null);

  const [activeBoxId, setActiveBoxId] = useState(1);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scrollIndicatorHeight = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "50%", "100%"],
    {
      ease: cubicBezier(0.6, 0.6, 0.6, 0.1),
    },
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const current = Math.round(latest * (boxes.length - 1) + 1);

    if (current !== activeBoxId) {
      setActiveBoxId(current);
    }
  });

  console.log("hello");

  return (
    <main className="flex flex-col items-center justify-between py-[54vh]">
      <div className="text-4xl pb-20">Scroll To See</div>
      <section className="py-48 px-0 w-full">
        <div className="max-w-[calc(1234px_+_2rem)] mx-auto w-full px-8">
          <div className="flex gap-16 [&>div]:flex-1">
            <Workflow />
            {/* Stack */}
            <div ref={targetRef} className="relative h-[500vh]">
              <div className="sticky top-0 left-0 flex items-center h-screen">
                {boxes.map((props) => (
                  <Box key={props.id} {...props} activeBoxId={activeBoxId} />
                ))}

                {/* Stick */}
                <div className="absolute right-0 flex flex-col items-center gap-2">
                  <motion.span className="text-[12px] opacity-40">
                    {`0${activeBoxId}`}
                  </motion.span>
                  <div className="w-[4px] h-[400px] bg-[#232323] relative rounded-full overflow-hidden">
                    <motion.span
                      className="absolute top-0 left-0 w-full bg-[#a594fd]  rounded-full"
                      style={{
                        height: scrollIndicatorHeight,
                        backgroundColor: useMotionTemplate`hsl(270, 100%, ${scrollIndicatorHeight})`,
                      }}
                    />
                  </div>
                  <motion.span className="text-[12px] opacity-40">
                    0{boxes.length}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
