const ExportPDF = ({ orderDetails }) => {
  const { table, floor, time, orders } = orderDetails;
  return (
    <div id="pdfFormat">
      <div className="w-[300px] text-[#0A111F]">
        <div className="flex justify-center">
          <img
            className="w-[68px] h-6"
            src="./assets/images/logo.png"
            alt="logo"
          />
        </div>
        <h1 className="text-center font-bold text-base mt-2 mb-4">{`Table ${table} Floor ${floor} ${time}`}</h1>

        <div>
          {Object.entries(orders).map(([key, value]) => (
            <div key={key}>
              <div>
                {value.map(
                  ({ title, time, without, extra, variant1, note, count }) => (
                    <div className="border-b py-8 border-[#0A111F]">
                      <div className="flex w-full items-center  justify-between font-semibold text-base">
                        <h2>
                          {title} *{count}
                        </h2>
                        <h2>{key}</h2>
                      </div>

                      <div className=" mt-2 space-y-2">
                        <div className="flex items-center">
                          <h3 className="font-medium w-28">Without:</h3>
                          <h3 className="font-normal text-[#627193]">
                            {without}
                          </h3>
                        </div>{" "}
                        <div className="flex items-center">
                          <h3 className="font-medium w-28">Extra:</h3>
                          <h3 className="font-normal text-[#627193]">
                            {extra}
                          </h3>
                        </div>
                        <div className="flex items-center">
                          <h3 className="font-medium w-28">Variant 1:</h3>
                          <h3 className="font-normal text-[#627193]">
                            {variant1}
                          </h3>
                        </div>{" "}
                        <h3 className="font-normal text-[#627193]">{note}</h3>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportPDF;
