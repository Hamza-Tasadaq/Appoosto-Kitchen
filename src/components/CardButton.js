const CardButton = ({ text = "" }) => {
  return (
    <button
      className={`${text === "Reject" && "bg-[#FF5757] "} ${
        text === "On preparation" && "bg-[#32C5FF]"
      } ${
        text === "Ready" && "bg-[#71D499]"
      } text-[#ffffff] w-36 rounded-md py-1 px-4 font-semibold text-base`}
    >
      {text}
    </button>
  );
};

export default CardButton;
