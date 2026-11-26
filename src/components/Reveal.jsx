import { motion, useReducedMotion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 28 },
  /* Clear transform after settle — leftover translateY(0) blurs text on Windows GPUs */
  visible: { opacity: 1, y: 0, transitionEnd: { y: 0, transform: "none" } },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as === "div" ? "div" : as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      variants={variants}
      {...rest}
    >
      {children}
    </Component>
  );
}
