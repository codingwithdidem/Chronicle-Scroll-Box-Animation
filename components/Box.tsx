import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 250,
    scale: 0.8,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
  }),
  exit: {
    opacity: 0,
    y: 250,
    scale: 0.8,
  },
};

export function Box({
  id,
  title,
  description,
  activeBoxId,
}: {
  id: string;
  title: string;
  description: string;
  activeBoxId: number;
}) {
  const isActive = activeBoxId === Number(id);

  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full pr-16 flex items-center box-${id}`}
      variants={boxVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      transition={{
        duration: 0.5,
      }}
      custom={id}
    >
      <div className="rounded-[1.25rem] bg-[#101010]">
        <div className="px-10 text-center w-full p-20">
          <h3 className="mb-4 text-4xl leading-[1]">{title}</h3>
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
