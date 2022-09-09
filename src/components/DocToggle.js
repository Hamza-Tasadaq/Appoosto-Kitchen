import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVisibility } from "../app/slices/Orders";

const DocToggle = ({ id }) => {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);

  const clickHandler = () => {
    if (enabled) {
      dispatch(updateVisibility({ id, update: "show" }));
    } else {
      dispatch(updateVisibility({ id, update: "hide" }));
    }

    setEnabled(!enabled);
  };
  return (
    <div
      onClick={clickHandler}
      className={`bg-[#D85C27] rounded-md duration-300 h-8 w-20 p-[3px] cursor-pointer flex items-center justify-between  ${
        enabled ? " flex-row-reverse " : " flex-row "
      }`}
    >
      <div className="bg-white h-full w-1/2 rounded-sm"></div>
      {enabled ? (
        <img
          className="mx-1 h-6 w-6"
          src="./assets/icons/double-doc.svg"
          alt="double-doc"
        />
      ) : (
        <img
          className="mx-2 h-6 w-6"
          src="./assets/icons/single-doc.svg"
          alt="single-doc"
        />
      )}
    </div>
  );
};

export default DocToggle;
