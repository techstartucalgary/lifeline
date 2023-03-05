const easeEmphasized = [0.2, 0.0, 0, 1.0];
const easeEmphasizedAccelerate = [0.3, 0.0, 0.8, 0.15];

const variants = {
  "initial": {
    x: "40%",
    opacity: 0,
  },
  "initial-lrt": {
    x: "-40%",
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transitionEnd: { transform: "none" },
    transition: {
      x: {
        duration: 0.6,
        ease: easeEmphasized,
      },
      opacity: {
        duration: 0.4,
        ease: easeEmphasizedAccelerate,
        delay: 0.1,
      },
    },
  },
  "leave": {
    x: "40%",
    opacity: 0,
    transition: {
      x: {
        duration: 0.6,
        ease: easeEmphasized,
      },
      opacity: {
        duration: 0.3,
        ease: easeEmphasizedAccelerate,
      },
    },
  },
  "leave-rtl": {
    x: "-40%",
    opacity: 0,
    transition: {
      x: {
        duration: 0.6,
        ease: easeEmphasized,
      },
      opacity: {
        duration: 0.3,
        ease: easeEmphasizedAccelerate,
      },
    },
  },
};

export { variants };
