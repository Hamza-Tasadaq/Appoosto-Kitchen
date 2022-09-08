import { useState } from "react";
import { Categories, Header, OrdersList, Switch } from "../components";

const Home = () => {
  // Holds The header is expands or not
  const [isExpand, setIsExpand] = useState(true);

  const [tableStatus, setTableStatus] = useState({
    "Dine In": true,
    Delivery: true,
    "Take away": true,
  });

  // Update the status on Click
  const statusUpdateHandler = (status) => {
    setTableStatus({
      ...tableStatus,
      [status]: !tableStatus[status],
    });
  };

  const [selectedCategories, setSelectedCategories] = useState({
    pizza: false,
    drinks: false,
    hotdog: false,
    fries: false,
    muffins: false,
    breads: false,
    icecream: false,
    cupcake: false,
  });

  const categoryClickHandler = (selectedItem, itemClicked) => {
    setSelectedCategories({
      ...selectedCategories,
      [selectedItem]: !selectedCategories[selectedItem],
    });
  };

  // Hold The filters
  const [filters, setFilters] = useState({
    isReadyClicked: false,
    isRefusedClicked: false,
    isCompletedCLick: false,
    isProgressClicked: true,
  });

  // Runs on modifiying Filters
  const filtersHandler = (selectedSwitch) => {
    if (selectedSwitch === "Show Refused") {
      setFilters({
        ...filters,
        isRefusedClicked: !filters.isRefusedClicked,
      });
    } else if (selectedSwitch === "Show Ready") {
      setFilters({
        ...filters,
        isReadyClicked: !filters.isReadyClicked,
      });
    } else if (selectedSwitch === "In Progress") {
      setFilters({
        ...filters,
        isCompletedCLick: !filters.isCompletedCLick,
        isProgressClicked: !filters.isProgressClicked,
      });
    } else if (selectedSwitch === "completed") {
      setFilters({
        ...filters,
        isProgressClicked: !filters.isProgressClicked,
        isCompletedCLick: !filters.isCompletedCLick,
      });
    }
  };
  return (
    <div>
      <div className="sticky top-0 left-0 z-50 bg-white">
        <Header
          statusUpdateHandler={statusUpdateHandler}
          tableStatus={tableStatus}
          isExpand={isExpand}
          setIsExpand={setIsExpand}
        />
        {isExpand && (
          <>
            <div className="px-3 md:px-5 lg:px-10 py-2 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      filtersHandler("In Progress");
                    }}
                    className={`${
                      filters.isProgressClicked
                        ? " bg-[#0C234C] text-[#ffffff] "
                        : " bg-transparent text-[#627193]"
                    }   rounded-md font-semibold text-base py-2  px-5`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => {
                      filtersHandler("completed");
                    }}
                    className={`${
                      filters.isCompletedCLick
                        ? " bg-[#0C234C] text-[#ffffff] "
                        : " bg-transparent text-[#627193]"
                    }  rounded-md font-semibold text-base py-2  px-5`}
                  >
                    Completed
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch handleFilter={filtersHandler} text={"Show Refused"} />
                  <Switch handleFilter={filtersHandler} text={"Show Ready"} />
                </div>
              </div>
              <Categories
                selectedCategories={selectedCategories}
                categoryClickHandler={categoryClickHandler}
              />
            </div>
          </>
        )}
      </div>
      <div className="px-3 md:px-5 lg:px-10 py-2 space-y-6">
        <OrdersList
          tableStatus={tableStatus}
          selectedCategories={selectedCategories}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Home;
