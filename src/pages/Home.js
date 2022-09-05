import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Categories, Header, OrdersList, Switch } from "../components";

const Home = () => {
  const { orders } = useSelector((state) => state.orders);

  // Holds Is there is any item in preparation state
  const [isPreparationHave, setIsPreparationHave] = useState();

  // useEffect(() => {
  //   // Check Is there in item exists which have preparation state
  //   const response = orders.filter((orderItem) => {
  //     if (orderItem.orders.preparation.length > 0) {
  //       return orderItem;
  //     }
  //     return null;
  //   });

  //   // If preparation state have one or more items then it will update the state if If block and else in else block
  //   if (response.length > 0) {
  //     setIsPreparationHave(true);
  //   } else {
  //     setIsPreparationHave(false);
  //   }
  // });

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
      <Header />
      <div className="px-3 md:px-5 lg:px-10 py-5 space-y-6">
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
        <Categories />
        <OrdersList filters={filters} />
      </div>
    </div>
  );
};

export default Home;
