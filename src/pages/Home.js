import { Categories, Header, OrdersList, Switch } from "../components";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="px-3 md:px-5 lg:px-10 py-5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="bg-[#0C234C] text-[#ffffff] rounded-md font-semibold text-base py-2  px-5">
              In Progress
            </button>
            <button className="bg-transparent text-[#627193] rounded-md font-semibold text-base py-2  px-5">
            Completed
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch text={"Show Refused"} />
            <Switch text={"Show Ready"} />
          </div>
        </div>
        <Categories />
        <OrdersList />
      </div>
    </div>
  );
};

export default Home;
