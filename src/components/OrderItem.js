import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const OrderItem = ({ provided, orderDetails }) => {
  // Destructing the Props of details of orders
  const { table, floor, time } = orderDetails;

  //   Handle The State About the details of order is shown or not?
  const [isOpen, setIsOpen] = useState(false);

  const showDetailsHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <div className="flex items-center space-x-2">
        <div className="bg-[#0C234C] text-[#ffffff] p-2 rounded-md space-x-1 lg:space-x-0 flex items-center justify-between flex-1 h-16 ">
          <div className="flex items-center flex-1 font-medium text-lg justify-start space-x-4 lg:space-x-0 lg:justify-between ">
            <h2>Table-{table}</h2>
            <h2>Floor- {floor}</h2>
            <h2>
              Order Time: <span className="font-light">{time}</span>
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2">
            <button className="rounded-md bg-[#71D499] lg:w-28 h-9 outline-none font-semibold text-sm lg:text-base py-1.5 px-4">
              Prepare All
            </button>{" "}
            <button className="rounded-md bg-[#FF5757] lg:w-28 h-9 outline-none font-semibold text-sm lg:text-base py-1.5 px-4">
              Reject All
            </button>
            <button className="h-9 w-9 flex items-center justify-center rounded-md bg-[#627193]">
              <img src="./assets/icons/download.svg" alt="svg" />
            </button>
            <button
              onClick={showDetailsHandler}
              className="h-9 w-9 flex items-center justify-center rounded-md bg-[#294270]"
            >
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </div>
        </div>
        {/* Button By which user can drag */}
        <div
          {...provided.dragHandleProps}
          className="w-10 h-16 flex items-center justify-center border rounded-md border-[#E9E9E9] bg-[#FFFFFF]"
        >
          <img src="./assets/icons/dots.svg" alt="dots" />
        </div>
      </div>
      {isOpen && <div className="my-2.5"></div>}
    </li>
  );
};

export default OrderItem;
