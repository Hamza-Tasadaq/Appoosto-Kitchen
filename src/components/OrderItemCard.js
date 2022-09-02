import { useDispatch } from "react-redux";
import { splitCard } from "../app/slices/Orders";
import CardButton from "./CardButton";
import Switch from "./Switch";

const OrderItemCard = ({ status = "", orderItemData = {}, table = "" }) => {
  const dispatch = useDispatch();
  const { id, title, time, without, extra, variant1, note, count } =
    orderItemData;

  const handleSplit = () => {
    dispatch(splitCard({ id, table, status }));
    console.log("split Happens");
  };
  return (
    <div
      className={`rounded-md box-shadow p-2 border-2 space-y-4  ${
        status === "preparation" && "bg-[#F0FFFF] border-[#C9FFFF]"
      } ${status === "ready" && "bg-[#F1FFF6] border-[#C1FFD7]"} ${
        status === "rejected" && "bg-[#FFF0F0] border-[#FFBBBB]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0A111F] font-bold text-base">
            {title} x{count}
          </h1>
          <p className="text-[#627193] flex items-center space-x-1">
            <span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 7.54833C0 7.18388 0 6.81943 0 6.45497C0.0179858 6.35808 0.0417527 6.26184 0.0539573 6.16431C0.143886 5.45594 0.31732 4.76874 0.628218 4.12453C1.71828 1.86594 3.49181 0.489621 5.97834 0.0937279C7.8161 -0.198861 9.53246 0.195107 11.0291 1.29296C13.3377 2.98754 14.3469 5.29617 13.8947 8.13223C13.4829 10.7161 11.9734 12.5089 9.55623 13.4964C8.92544 13.7543 8.22271 13.8371 7.55338 14C7.18853 14 6.82368 14 6.45882 14C6.26226 13.9654 6.0657 13.9333 5.86914 13.8967C3.29397 13.4149 1.49025 11.9628 0.502959 9.54705C0.24602 8.91695 0.163157 8.21628 0 7.54833ZM6.99839 1.09277C3.73526 1.09854 1.08557 3.75302 1.09135 7.00999C1.09713 10.2695 3.75453 12.9163 7.0151 12.9105C10.2782 12.9048 12.9279 10.2503 12.9221 6.99331C12.9157 3.73312 10.259 1.08699 6.99839 1.09277Z"
                  fill="#627193"
                />
                <path
                  d="M6.46204 5.43343C6.46204 4.92396 6.45883 4.41386 6.46332 3.90439C6.46718 3.50208 6.68044 3.25505 7.00996 3.25762C7.33949 3.26019 7.54825 3.50593 7.55018 3.91145C7.55403 4.76676 7.55853 5.62271 7.54632 6.47802C7.54311 6.7026 7.61377 6.83798 7.79813 6.96888C8.34027 7.35258 8.87021 7.75425 9.39372 8.16362C9.51577 8.25922 9.63267 8.39846 9.68278 8.54155C9.76114 8.76484 9.68149 8.9785 9.47787 9.11453C9.26589 9.25634 9.043 9.23773 8.84066 9.09015C8.42185 8.78409 8.00817 8.47097 7.59257 8.16041C7.31572 7.95316 7.04144 7.7427 6.76073 7.53994C6.55133 7.38916 6.45562 7.19538 6.46011 6.93487C6.46846 6.43439 6.46204 5.93391 6.46204 5.43343Z"
                  fill="#627193"
                />
              </svg>
            </span>
            <span>{time}</span>
          </p>
        </div>
        {count > 1 && <Switch handleSplit={handleSplit} text="Split" />}
      </div>
      <div
        className={`w-full h-px  ${
          status === "preparation" && "bg-[#C9FFFF]"
        } ${status === "ready" && "bg-[#C1FFD7]"} ${
          status === "rejected" && "bg-[#FFBBBB]"
        }`}
      />

      <div>
        <div className="flex items-center ">
          <h2 className="text-[#0A111F] w-28 lg:w-36 font-semibold text-base">
            Without:
          </h2>
          <p className="text-[#627193] flex-1 text-sm font-normal">{without}</p>
        </div>
        <div className="flex items-center ">
          <h2 className="text-[#0A111F] w-28 lg:w-36 font-semibold text-base">
            Extra:
          </h2>
          <p className="text-[#627193] flex-1 text-sm font-normal">{extra}</p>
        </div>
        <div className="flex items-center ">
          <h2 className="text-[#0A111F] w-28 lg:w-36 font-semibold text-base">
            Variant 1:
          </h2>
          <p className="text-[#627193] flex-1 text-sm font-normal">
            {variant1}
          </p>
        </div>
        <div className="flex items-center ">
          <h2 className="text-[#0A111F] w-28 lg:w-36 font-semibold text-base">
            Order Time:
          </h2>
          <p className="text-[#627193] flex-1 text-sm font-normal">{time}</p>
        </div>
        <div className="flex items-center ">
          <h2 className="text-[#0A111F] w-28 lg:w-36 font-semibold text-base">
            Note:
          </h2>
          <p className="text-[#627193] flex-1 text-sm font-normal">{note}</p>
        </div>
      </div>

      <div
        className={`w-full h-px  ${
          status === "preparation" && "bg-[#C9FFFF]"
        } ${status === "ready" && "bg-[#C1FFD7]"} ${
          status === "rejected" && "bg-[#FFBBBB]"
        }`}
      />

      <div
        className={`flex items-center  space-x-2 ${
          status === "preparation" && "justify-between"
        }
        ${status === "rejected" && "justify-end"}
        ${status === "ready" && "justify-start"}
        `}
      >
        {status === "preparation" && <CardButton text="Reject" />}
        {(status === "rejected" || status === "ready") && (
          <CardButton text="On preparation" />
        )}

        {status === "preparation" && <CardButton text="Ready" />}
      </div>
    </div>
  );
};

export default OrderItemCard;
