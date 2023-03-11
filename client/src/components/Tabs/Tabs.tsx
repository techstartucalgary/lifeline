import { RefObject, createRef, useEffect, useState } from "react";

import { classnames } from "../../Utilities";
import { Button } from "../Button";

type Tab = {
  name: string;
};

interface TabsProps {
  tabs: Tab[];
  tab: Tab | number;
  onChangeTab?: (tab: Tab, index: number) => void;
}

const Tabs = ({ tabs, tab, onChangeTab = () => null }: TabsProps) => {
  const currentTabIndex = typeof tab === "number" ? tab : tabs.indexOf(tab);

  const [refs, setRefs] = useState<RefObject<HTMLSpanElement>[]>([]);
  useEffect(() => {
    setRefs((r) =>
      Array(tabs.length)
        .fill(null)
        .map((_, i) => r[i] || createRef())
    );
  }, [tabs, refs.length]);

  return (
    <div className="md:hidden border-b-[1px] border-b-surface-variant relative">
      <div className="w-full flex flex-row">
        {tabs.map((item, index) => (
          <Button
            key={index}
            className={classnames(
              "w-full p-4 justify-center text-on-surface-variant",
              tab === item && "text-primary"
            )}
            onClick={() => onChangeTab(item, index)}
          >
            <span ref={refs[index]}>{item.name}</span>
          </Button>
        ))}
      </div>
      <div
        className="w-24 h-1 rounded-t-lg bg-primary absolute bottom-0"
        style={{
          width: refs[currentTabIndex].current?.getBoundingClientRect().width,
          left: refs[currentTabIndex].current?.getBoundingClientRect().left,
        }}
      />
    </div>
  );
};

export default Tabs;
export type { TabsProps, Tab };
