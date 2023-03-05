const easeEmphasized = [0.2, 0.0, 0, 1.0];
const easeEmphasizedAccelerate = [0.3, 0.0, 0.8, 0.15];

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
  leave: (x: number | string) => ({
    x: x,
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
  }),
};

// When transform is finished on `enter`, remove transform property to
// restore `fixed` elements layout
const transformTemplate = ({ x }: never) =>
  parseInt(String(x)) === 0 ? "none" : `translateX(${x})`;

export { variants, transformTemplate };
