import { HTMLAttributes } from "react";
import ListItem from "./ListItem";
import { classnames } from "../../Utilities";

type ListProps = HTMLAttributes<HTMLDivElement>;

const List = ({
  children,
  ...args
}: ListProps) => {
  return (
    <div {...args} className={classnames("flex flex-col w-full", args.className)}>
      {children}
    </div>
  );
};

List.Item = ListItem;

export default List;
export type { ListProps };