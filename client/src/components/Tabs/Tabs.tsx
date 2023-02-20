import { classnames } from "../../Utilities";
import { Tab } from "../../pages/Review";

export interface TabsProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}

function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
  return (
    <div className="w-full md:hidden flex flex-row">
      <button
        className={classnames(
          "w-full bg-gray-300 p-2",
          selectedTab === Tab.Assessments && "bg-red-500"
        )}
        onClick={() => setSelectedTab(Tab.Assessments)}
      >
        Assessments
      </button>
      <button
        className={classnames(
          "w-full bg-gray-300 p-2",
          selectedTab === Tab.Document && "bg-red-500"
        )}
        onClick={() => setSelectedTab(Tab.Document)}
      >
        Document
      </button>
    </div>
  );
}

export default Tabs;
