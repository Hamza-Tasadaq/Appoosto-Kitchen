import { useState } from "react";
import pdfMake from "pdfmake";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateAllOrdersOfTable } from "../app/slices/Orders";
import OrderItemCard from "./OrderItemCard";
import DocToggle from "./DocToggle";

// To Load Image into PDFMAke
function getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
}
const OrderItem = ({
  provided,
  orderDetails = {},
  filters = {},
  selectedCategories = {},
  tableStatus = {},
}) => {
  const {
    isReadyClicked,
    isRefusedClicked,
    isCompletedCLick,
    isProgressClicked,
  } = filters;
  const dispatch = useDispatch();

  // Destructing the Props of details of orders
  const { id, table, floor, time, orders, status, isVisible } = orderDetails;

  const { preparation, ready, rejected } = orders;

  //   Handle The State About the details of order is shown or not?
  const [isOpen, setIsOpen] = useState(false);

  const showDetailsHandler = () => {
    setIsOpen(!isOpen);
  };

  // Buttons Runs on Update All And Reject All
  const handleButtonClick = (text) => {
    dispatch(updateAllOrdersOfTable({ type: text, table }));
  };

  // Check Is it exist in selected Categories or not?
  const validate = (category) => {
    const notSelectedAnyCategory = Object.values(selectedCategories).every(
      (value) => value === false
    );
    if (notSelectedAnyCategory) {
      return true;
    } else {
      return selectedCategories[category];
    }
  };

  // Generate PDF function
  const generatePdf = async () => {
    // Content
    let content = [
      {
        image: await getBase64ImageFromURL("./assets/images/logo.png"),
        width: 68,
        alignment: "center",
      },
      {
        text: `Table ${table} Floor ${floor} ${time}`,
        style: "mainHeading",
        alignment: "center",
      },
    ];

    // Pushing Dynamic Content
    Object.entries(orders).forEach(([key, value]) => {
      value.forEach(({ title, without, extra, variant1, note, count }) => {
        content.push({
          columns: [
            {
              text: `${title} * ${count}`,
              alignment: "left",
            },
            {
              text: `${key}`,
              alignment: "right",
            },
          ],
          style: "heading",
        });
        content.push({
          alignment: "left",
          columns: [
            {
              text: "Without:",
              fontSize: 14,
              semibold: true,
            },
            {
              text: `${without}`,
              color: "#627193",
            },
          ],
        });
        content.push({
          alignment: "left",
          columns: [
            {
              text: "Extra:",
              fontSize: 14,
              semibold: true,
            },
            {
              text: `${extra}`,
              color: "#627193",
            },
          ],
        });
        content.push({
          alignment: "left",
          columns: [
            {
              text: "Variant 1:",
              fontSize: 14,
              semibold: true,
            },
            {
              text: `${variant1}`,
              color: "#627193",
            },
          ],
        });
        content.push({
          alignment: "left",
          text: `${note}`,
          color: "#627193",
        });
        content.push({
          margin: [0, 5, 0, 10],
          svg: '<svg width="260" height="2" viewBox="0 0 260 2" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.00188678" y1="0.500004" x2="259.002" y2="1.47736" stroke="black"/></svg>',
        });
      });
    });

    // Document Settings
    var docDefinition = {
      pageSize: {
        width: 300,
        height: "auto",
      },
      pageMargins: [20, 30, 20, 30],
      content: content,
      styles: {
        mainHeading: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 25],
        },
        heading: {
          fontSize: 16,
          semibold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };
    pdfMake.createPdf(docDefinition).download(`Table-${table}.pdf`);
  };

  // Check is it according to the selected Table status or not
  const validateStatus = (status) => {
    return tableStatus[status];
  };

  return (
    <li
      className="relative"
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <>
        {isProgressClicked &&
          preparation.length > 0 &&
          validateStatus(status) &&
          isVisible && (
            <>
              <div className="flex items-center space-x-2">
                <div className="bg-[#0C234C] text-[#ffffff] p-2 rounded-md space-x-1 lg:space-x-0 flex items-center justify-between flex-1 h-16 ">
                  <div className="flex items-center flex-1 font-medium text-lg justify-start space-x-3 lg:space-x-0 lg:justify-between ">
                    <h2 className="text-sm lg:text-lg">Table-{table}</h2>
                    <h2 className="text-sm lg:text-lg">Floor- {floor}</h2>
                    <h2 className="text-sm lg:text-lg">{status}</h2>
                    <h2 className="flex text-sm lg:text-lgs items-center space-x-1">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10.7832C0 10.2625 0 9.74187 0 9.22123C0.025694 9.08281 0.0596467 8.94532 0.0770819 8.80599C0.205552 7.79403 0.453315 6.81232 0.897453 5.89202C2.45469 2.66547 4.9883 0.699296 8.54049 0.133734C11.1659 -0.28425 13.6178 0.278562 15.7559 1.84692C19.0539 4.26775 20.4955 7.56579 19.8495 11.6173C19.2613 15.3086 17.1048 17.8697 13.6518 19.2803C12.7506 19.6488 11.7467 19.7671 10.7905 19.9999C10.2693 19.9999 9.74811 19.9999 9.22689 19.9999C8.94609 19.9504 8.66529 19.9046 8.38449 19.8523C4.70567 19.1639 2.12893 17.0896 0.718513 13.6385C0.351457 12.7383 0.233081 11.7374 0 10.7832ZM9.9977 1.56093C5.33609 1.56918 1.55081 5.36129 1.55907 10.0141C1.56733 14.6706 5.36362 18.4517 10.0216 18.4435C14.6832 18.4352 18.4685 14.6431 18.4602 9.99028C18.451 5.33287 14.6557 1.55268 9.9977 1.56093Z"
                            fill="white"
                          />
                          <path
                            d="M9.23148 7.76204C9.23148 7.03423 9.2269 6.30551 9.23332 5.5777C9.23883 5.00297 9.54348 4.65007 10.0142 4.65374C10.485 4.6574 10.7832 5.00847 10.786 5.58779C10.7915 6.80966 10.7979 8.03244 10.7805 9.25432C10.7759 9.57514 10.8768 9.76855 11.1402 9.95554C11.9147 10.5037 12.6717 11.0775 13.4196 11.6623C13.594 11.7989 13.761 11.9978 13.8325 12.2022C13.9445 12.5212 13.8307 12.8264 13.5398 13.0208C13.237 13.2233 12.9186 13.1968 12.6295 12.9859C12.0312 12.5487 11.4402 12.1014 10.8465 11.6577C10.451 11.3617 10.0592 11.061 9.65819 10.7713C9.35904 10.5559 9.22231 10.2791 9.22873 9.90696C9.24066 9.19198 9.23148 8.47701 9.23148 7.76204Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-sm lg:text-lg">
                        Order Time: <span className="font-light">{time}</span>
                      </span>
                    </h2>
                  </div>
                  <div className="flex-1 flex items-center justify-end space-x-2">
                    <DocToggle id={id} />
                    <button
                      onClick={() => {
                        handleButtonClick("Prepare All");
                      }}
                      className="rounded-md bg-[#71D499] lg:w-28 h-9 outline-none font-semibold text-sm lg:text-base py-1.5 px-4"
                    >
                      Prepare All
                    </button>{" "}
                    <button
                      onClick={() => {
                        handleButtonClick("Reject All");
                      }}
                      className="rounded-md bg-[#FF5757] lg:w-28 h-9 outline-none font-semibold text-sm lg:text-base py-1.5 px-4"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={generatePdf}
                      className="h-9 w-9 flex items-center justify-center rounded-md bg-[#627193]"
                    >
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
              {isOpen && (
                <>
                  <div className="my-2.5 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {preparation &&
                      preparation.map(
                        (orderItemData, index) =>
                          validate(orderItemData.category) && (
                            <OrderItemCard
                              key={index}
                              orderItemData={orderItemData}
                              status="preparation"
                              table={table}
                            />
                          )
                      )}
                    {ready &&
                      isReadyClicked &&
                      ready.map(
                        (orderItemData, index) =>
                          validate(orderItemData.category) && (
                            <OrderItemCard
                              key={index}
                              orderItemData={orderItemData}
                              status="ready"
                              table={table}
                            />
                          )
                      )}
                    {rejected &&
                      isRefusedClicked &&
                      rejected.map(
                        (orderItemData, index) =>
                          validate(orderItemData.category) && (
                            <OrderItemCard
                              key={index}
                              orderItemData={orderItemData}
                              status="rejected"
                              table={table}
                            />
                          )
                      )}
                  </div>
                  {/* <ExportPDF orderDetails={orderDetails} /> */}
                </>
              )}
            </>
          )}

        {isCompletedCLick &&
          preparation.length === 0 &&
          validateStatus(status) &&
          isVisible && (
            <>
              <div className="flex items-center space-x-2">
                <div className="bg-[#0C234C] text-[#ffffff] p-2 rounded-md space-x-1 lg:space-x-0 flex items-center justify-between flex-1 h-16 ">
                  <div className="flex items-center flex-1 font-medium text-lg justify-start md:space-x-3 lg:space-x-0 lg:justify-between ">
                    <h2 className="text-sm lg:text-lg">Table-{table}</h2>
                    <h2 className="text-sm lg:text-lg">Floor- {floor}</h2>
                    <h2 className="text-sm lg:text-lg">{status}</h2>
                    <h2 className="flex text-sm lg:text-lg items-center space-x-1">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10.7832C0 10.2625 0 9.74187 0 9.22123C0.025694 9.08281 0.0596467 8.94532 0.0770819 8.80599C0.205552 7.79403 0.453315 6.81232 0.897453 5.89202C2.45469 2.66547 4.9883 0.699296 8.54049 0.133734C11.1659 -0.28425 13.6178 0.278562 15.7559 1.84692C19.0539 4.26775 20.4955 7.56579 19.8495 11.6173C19.2613 15.3086 17.1048 17.8697 13.6518 19.2803C12.7506 19.6488 11.7467 19.7671 10.7905 19.9999C10.2693 19.9999 9.74811 19.9999 9.22689 19.9999C8.94609 19.9504 8.66529 19.9046 8.38449 19.8523C4.70567 19.1639 2.12893 17.0896 0.718513 13.6385C0.351457 12.7383 0.233081 11.7374 0 10.7832ZM9.9977 1.56093C5.33609 1.56918 1.55081 5.36129 1.55907 10.0141C1.56733 14.6706 5.36362 18.4517 10.0216 18.4435C14.6832 18.4352 18.4685 14.6431 18.4602 9.99028C18.451 5.33287 14.6557 1.55268 9.9977 1.56093Z"
                            fill="white"
                          />
                          <path
                            d="M9.23148 7.76204C9.23148 7.03423 9.2269 6.30551 9.23332 5.5777C9.23883 5.00297 9.54348 4.65007 10.0142 4.65374C10.485 4.6574 10.7832 5.00847 10.786 5.58779C10.7915 6.80966 10.7979 8.03244 10.7805 9.25432C10.7759 9.57514 10.8768 9.76855 11.1402 9.95554C11.9147 10.5037 12.6717 11.0775 13.4196 11.6623C13.594 11.7989 13.761 11.9978 13.8325 12.2022C13.9445 12.5212 13.8307 12.8264 13.5398 13.0208C13.237 13.2233 12.9186 13.1968 12.6295 12.9859C12.0312 12.5487 11.4402 12.1014 10.8465 11.6577C10.451 11.3617 10.0592 11.061 9.65819 10.7713C9.35904 10.5559 9.22231 10.2791 9.22873 9.90696C9.24066 9.19198 9.23148 8.47701 9.23148 7.76204Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-sm lg:text-lg">
                        Order Time: <span className="font-light">{time}</span>
                      </span>
                    </h2>
                  </div>
                  <div className="flex-1 flex items-center justify-end space-x-2">
                    <DocToggle id={id} />
                    <button
                      onClick={() => {
                        handleButtonClick("Prepare All");
                      }}
                      className="rounded-md bg-[#71D499] lg:w-28 h-9 outline-none font-semibold text-sm lg:text-base py-1.5 px-4"
                    >
                      Prepare All
                    </button>{" "}
                    <button
                      onClick={() => {
                        handleButtonClick("Reject All");
                      }}
                      className="rounded-md bg-[#FF5757] lg:w-28 h-9 outline-none font-semibold text-sm lg:text-base py-1.5 px-4"
                    >
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
              <div>
                {isOpen && (
                  <>
                    <div className="my-2.5 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {preparation &&
                        preparation.map(
                          (orderItemData, index) =>
                            validate(orderItemData.category) && (
                              <OrderItemCard
                                key={index}
                                orderItemData={orderItemData}
                                status="preparation"
                                table={table}
                              />
                            )
                        )}
                      {ready &&
                        isReadyClicked &&
                        ready.map(
                          (orderItemData, index) =>
                            validate(orderItemData.category) && (
                              <OrderItemCard
                                key={index}
                                orderItemData={orderItemData}
                                status="ready"
                                table={table}
                              />
                            )
                        )}
                      {rejected &&
                        isRefusedClicked &&
                        rejected.map(
                          (orderItemData, index) =>
                            validate(orderItemData.category) && (
                              <OrderItemCard
                                key={index}
                                orderItemData={orderItemData}
                                status="rejected"
                                table={table}
                              />
                            )
                        )}
                    </div>
                    {/* <ExportPDF orderDetails={orderDetails} /> */}
                  </>
                )}
              </div>
            </>
          )}
      </>
    </li>
  );
};

export default OrderItem;
