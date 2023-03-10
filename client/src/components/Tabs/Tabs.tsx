import { classnames } from "../../Utilities";
import { Button } from "../Button";

type Tab = {
  name: string;
};

interface TabsProps {
  tabs: Tab[];
  tab: Tab;
  onChangeTab?: (item: Tab, index: number) => void;
}

const Tabs = ({ tabs, tab, onChangeTab = () => null }: TabsProps) => {
  return (
    <div className="md:hidden border-b-[1px] border-b-surface-variant">
      <div className="w-full flex flex-row">
        {tabs.map((item, index) => (
          <Button
            key={index}
            className={classnames(
              "w-full p-4",
              "justify-center",
              "text-on-surface-variant",
              tab === item && "text-primary"
            )}
            onClick={() => onChangeTab(item, index)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
export type { TabsProps, Tab };
