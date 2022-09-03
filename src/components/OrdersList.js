import { useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const OrdersList = ({ filters }) => {
  const [orders, updateOrders] = useState(
    useSelector((state) => state.orders.orders)
  );

  const updatedOrders = useSelector((state) => state.orders.orders);
  // ReUpdate the Orders Array When Change in redux store
  useEffect(() => {
    updateOrders(updatedOrders);
  });

  //   Runs on drag and drop of an Item
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(orders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateOrders(items);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="orders">
        {(provided) => (
          <ul
            className="space-y-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orders.map((orderDetails, index) => (
              <Draggable
                key={orderDetails.id}
                draggableId={orderDetails.id}
                index={index}
              >
                {(provided) => (
                  <OrderItem
                    filters={filters}
                    updateOrders={updateOrders}
                    provided={provided}
                    orderDetails={orderDetails}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default OrdersList;
