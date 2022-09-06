import Container from "./Container";

const Header = ({
  tableStatus = {},
  isExpand = "",
  setIsExpand = () => {},
  statusUpdateHandler = () => {},
}) => {
  return (
    <div className="border-b border-[#E9E9E9] py-5">
      <Container
        classes={"flex items-center justify-between px-3 md:px-5 lg:px-10"}
      >
        <div>
          <img src="./assets/icons/logo.svg" alt="logo" />
        </div>

        {isExpand && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                statusUpdateHandler("Dine In");
              }}
              className={`duration-300 ${
                tableStatus["Dine In"]
                  ? " bg-transparent text-[#D85C27] "
                  : " bg-[#D85C27] text-[#ffffff]"
              } rounded-lg  py-2 px-6 border border-[#FF6422]`}
            >
              Dine In
            </button>
            <button
              onClick={() => {
                statusUpdateHandler("Delivery");
              }}
              className={`duration-300 ${
                tableStatus.Delivery
                  ? " bg-transparent text-[#D85C27] "
                  : " bg-[#D85C27] text-[#ffffff]"
              } rounded-lg  py-2 px-6 border border-[#FF6422]`}
            >
              Delivery
            </button>
            <button
              onClick={() => {
                statusUpdateHandler("Take away");
              }}
              className={`duration-300 ${
                tableStatus["Take away"]
                  ? " bg-transparent text-[#D85C27] "
                  : " bg-[#D85C27] text-[#ffffff]"
              } rounded-lg  py-2 px-6 border border-[#FF6422]`}
            >
              Take away
            </button>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <div
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className="w-8 cursor-pointer h-8"
          >
            {isExpand ? (
              <img
                className="w-full"
                src="./assets/icons/expand.svg"
                alt="expnad"
              />
            ) : (
              <img
                className="w-full"
                src="./assets/icons/minimize.svg"
                alt="minimize"
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <img src="./assets/icons/avatar.svg" alt="avatar" />
            <h2 className="text-[#0A111F] font-semibold text-base">username</h2>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
