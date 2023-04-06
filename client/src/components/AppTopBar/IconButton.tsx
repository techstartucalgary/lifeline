import { classnames } from "../../Utilities";
import {
  IconButton as RawIconButton,
  IconButtonProps as RawIconButtonProps,
} from "../Button";
type IconButtonProps = RawIconButtonProps;
const IconButton = ({ children, ...args }: IconButtonProps) => (
  <RawIconButton
    {...args}
    className={classnames(
      "p-0 md:p-0 w-10 md:w-12 h-12 text-2xl justify-center items-center",
      args.className
    )}
  >
    {children}
  </RawIconButton>
);
export { IconButton as AppTopBarIconButton };
export type { IconButtonProps as AppTopBarIconButtonProps };
