const Input = ({ placeholder, name, type }) => {
  return (
    <input
      className="rounded-md w-full outline-none bg-[#F5F6FA] border border-[#E7E7E7] p-2"
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
