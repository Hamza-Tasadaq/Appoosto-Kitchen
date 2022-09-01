import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import OrderItem from "./OrderItem";

const d = [
  {
    id: "1",
    table: "1",
    floor: "1",
    time: "12:00",
  },
  {
    id: "2",
    table: "2",
    floor: "1",
    time: "2:45",
  },
  {
    id: "3",
    table: "3",
    floor: "2",
    time: "12:10",
  },
  // {
  //   id: "4",
  //   table: "4",
  //   floor: "2",
  //   time: "1:20",
  // },
  // {
  //   id: "5",
  //   table: "5",
  //   floor: "1",
  //   time: "5:40",
  // },
  // {
  //   id: "6",
  //   table: "6",
  //   floor: "3",
  //   time: "5:45",
  // },
];

const OrdersList = () => {
  const [characters, updateCharacters] = useState(d);

  //   Runs on drag and drop of an Item
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
            {characters.map((orderDetails, index) => (
              <Draggable
                key={orderDetails.id}
                draggableId={orderDetails.id}
                index={index}
              >
                {(provided) => (
                  <OrderItem provided={provided} orderDetails={orderDetails} />
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
