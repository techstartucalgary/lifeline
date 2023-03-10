import { classnames } from "../../Utilities";
import { Button } from "../Button";

export interface TabsProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}

// Enum for the tabs
export enum Tab {
  Assessments,
  Document,
}

const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) => {
  return (
    <div className="md:hidden border-b-2">
      <div className="w-full flex flex-row">
        <Button
          className={classnames(
            "w-full p-2",
            "justify-center",
            "text-on-surface-variant",
            selectedTab === Tab.Assessments && "text-primary"
          )}
          onClick={() => setSelectedTab(Tab.Assessments)}
        >
          Assessments
        </Button>
        <Button
          className={classnames(
            "w-full p-2",
            "justify-center",
            "text-on-surface-variant",
            selectedTab === Tab.Document && "text-primary"
          )}
          onClick={() => setSelectedTab(Tab.Document)}
        >
          Document
        </Button>
      </div>
      <div className="w-full flex flex-row justify-around">
        <div
          className={classnames(
            "w-24 h-1 rounded-t-lg",
            selectedTab === Tab.Assessments && "bg-primary"
          )}
        />
        <div
          className={classnames(
            "w-24 h-1 rounded-t-lg",
            selectedTab === Tab.Document && "bg-primary"
          )}
        />
      </div>
    </div>
  );
};

export default Tabs;
