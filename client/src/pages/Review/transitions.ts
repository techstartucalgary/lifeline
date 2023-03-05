const easeEmphasized = [0.2, 0.0, 0, 1.0];
const easeEmphasizedAccelerate = [0.3, 0.0, 0.8, 0.15];
const shiftingDuration = 0.4;

const variants = {
  initial: (x: number | string) => ({
    x: x,
    opacity: 0,
  }),
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        duration: shiftingDuration,
        ease: easeEmphasized,
      },
      opacity: {
        duration: 0.24,
        ease: easeEmphasizedAccelerate,
        delay: 0.14,
      },
    },
  },
  leave: (x: number | string) => ({
    x: x,
    opacity: 0,
    transition: {
      x: {
        duration: shiftingDuration,
        ease: easeEmphasized,
      },
      opacity: {
        duration: 0.14,
        ease: easeEmphasizedAccelerate,
      },
    },
  }),
};

// When transform is finished on `enter`, remove transform property to
// restore `fixed` elements layout
const transformTemplate = ({ x }: never) =>
  parseFloat(String(x)) === 0.0 ? "none" : `translateX(${x})`;

export { variants, transformTemplate };
