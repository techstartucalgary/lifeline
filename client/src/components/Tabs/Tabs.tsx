import { RefObject, createRef, useEffect } from "react";
import { useList, useUpdate } from "react-use";

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
  const update = useUpdate();
  const currentTabIndex = typeof tab === "number" ? tab : tabs.indexOf(tab);

  const [refs, { set: setRefs }] = useList<RefObject<HTMLSpanElement>>([]);
  useEffect(() => {
    setRefs((r) =>
      Array(tabs.length)
        .fill(null)
        .map((_, i) => r[i] || createRef())
    );
  }, [tabs, refs.length, setRefs]);

  // Force re-render component to align tab indicator position
  setTimeout(update, 1);

  return (
    <div className="md:hidden border-b-[1px] border-b-surface-variant relative">
      <div className="w-full flex flex-row">
        {tabs.map((item, index) => (
          <Button
            key={index}
            className={classnames(
              "w-full p-4 justify-center text-on-surface-variant rounded-none",
              currentTabIndex === index && "text-primary"
            )}
            onClick={() => onChangeTab(item, index)}
          >
            <span ref={refs[index]}>{item.name}</span>
          </Button>
        ))}
      </div>
      <div
        className={classnames(
          "w-24 h-1 rounded-t-lg bg-primary absolute bottom-0 will-change-auto",
          "ease-emphasized duration-[0.4s] transition-transform origin-left"
        )}
        style={{
          width:
            refs[currentTabIndex]?.current?.getBoundingClientRect().width || 0,
          transform: `translateX(${
            refs[currentTabIndex]?.current?.getBoundingClientRect().left || 0
          }px)`,
        }}
      />
    </div>
  );
};

export default Tabs;
export type { TabsProps, Tab };
