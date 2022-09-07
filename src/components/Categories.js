const CategoriesData = [
  {
    iconSrc: "pizza",
    name: "Pizza",
    background: "#B56362",
  },

  {
    iconSrc: "drinks",
    name: "Drinks",
    background: "#175E95",
  },
  {
    iconSrc: "hotdog",
    name: "Hot Dogs",
    background: "#C397C5",
  },
  {
    iconSrc: "fries",
    name: "Fries",
    background: "#266D29",
  },
  {
    iconSrc: "muffins",
    name: "Muffins",
    background: "#32C5FF",
  },
  {
    iconSrc: "breads",
    name: "Breads",
    background: "#C73FCD",
  },
  {
    iconSrc: "icecream",
    name: "Ice Cream",
    background: "#EB8A89",
  },
  {
    iconSrc: "cupcake",
    name: "Cupcakes",
    background: "#4F94CA",
  },
];

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const Categories = ({
  categoryClickHandler = () => {},
  selectedCategories = {},
}) => {
  return (
    <div className="flex justify-center md:cursor-pointer lg:justify-between flex-nowrap items-center overflow-x-auto lg:space-x-4">
      {CategoriesData.map(({ iconSrc, name, background }, index) => (
        <div
          onClick={() => {
            categoryClickHandler(iconSrc);
          }}
          style={{
            backgroundColor: `${
              selectedCategories[iconSrc]
                ? hex2rgba(background, 0.5)
                : hex2rgba(background, 0.2)
            }`,
          }}
          key={index}
          className={`rounded-lg duration-300 h-28 min-w-xs w-full bg-opacity-20 flex  items-center justify-center flex-col m-2.5 lg:m-0`}
        >
          <img src={`./assets/icons/${iconSrc}.svg`} alt={iconSrc} />
          <h1 className="text-[#000000] font-semibold text-sm">{name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Categories;
