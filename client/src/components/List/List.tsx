import { HTMLAttributes } from "react";

import { classnames } from "../../Utilities";

import ListItem from "./ListItem";

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