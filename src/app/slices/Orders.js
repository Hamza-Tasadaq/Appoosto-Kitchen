import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: "1",
      table: "1",
      floor: "1",
      time: "12:00",
      orders: {
        preparation: [
          {
            category: "muffins",
            id: "muffins Fry",
            title: "muffins",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
          {
            category: "fries",
            id: "fries Fry",
            title: "fries Fry",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 3,
          },
        ],
        ready: [
          {
            category: "pizza",
            id: "pizza ",
            title: "pizza ",
            time: "4:20",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
          {
            category: "pizza",
            id: "pizza",
            title: "pizza Fry",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 3,
          },
        ],
        rejected: [
          {
            category: "drinks",
            id: "drinks",
            title: "drinks",
            time: "4:20",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
        ],
      },
    },
    {
      id: "2",
      table: "2",
      floor: "1",
      time: "2:45",
      orders: {
        preparation: [],
        ready: [
          {
            category: "cupcake",
            id: "cupcake ",
            title: "cupcake",
            time: "4:20",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
          {
            category: "breads",
            id: "breads",
            title: "breads",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 3,
          },
        ],
        rejected: [
          {
            category: "hotdog",
            id: "hotdog",
            title: "hotdog",
            time: "4:20",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
        ],
      },
    },
    {
      id: "3",
      table: "3",
      floor: "2",
      time: "12:10",
      orders: {
        preparation: [
          {
            category: "breads",
            id: "breads Fry",
            title: "breads",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
          {
            category: "icecream",
            id: "icecream",
            title: "icecream",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 3,
          },
        ],
        ready: [
          {
            category: "muffins",
            id: "muffins",
            title: "muffins",
            time: "4:20",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
          {
            category: "pizza",
            id: "pizzaS",
            title: "pizza Fry",
            time: "4:30",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 3,
          },
        ],
        rejected: [
          {
            category: "hotdog",
            id: "hotdog",
            title: "hotdog",
            time: "4:20",
            without: "Tomato",
            extra: "Extra Mozilla",
            variant1: "Rost Chicken",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            count: 1,
          },
        ],
      },
    },
  ],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    splitCard: (state, actions) => {
      //   Destructing the payloads
      const { table, status, id } = actions.payload;

      //   Finding the table in which have to update the orders and their index
      const mainIndex = state.orders.findIndex((x) => x.table === table);
      let ordersList = state.orders.find((x) => x.table === table);

      //   Finding the orders according to the status
      const sameStatusOrders = ordersList.orders[status];

      //   finding which order have to update
      const orderToUpdate = sameStatusOrders.find((x) => x.id === id);
      //   Extracting the count No
      const { count } = orderToUpdate;

      //   Creating a updated array
      let newArr = [];
      for (let i = 0; i < count; i++) {
        newArr.push({ ...orderToUpdate, count: 1 });
      }
      //   Getting the Status Orders and checking the index of selected one
      let statusOrder = state.orders[mainIndex].orders[status];
      const innerIndex = statusOrder.findIndex((x) => x.id === id);

      //   Updating the status order with new array
      statusOrder.splice(innerIndex, 1, ...newArr);
      ordersList.orders[status] = statusOrder;
      //   Updating new Card on main Index
      state.orders[mainIndex] = ordersList;
      const newOrders = state.orders;

      //   Updating the state orders
      state.orders = newOrders;
    },
    updateOrderStatus: (state, actions) => {
      const { type, id, table, status } = actions.payload;

      //   Finding the table in which have to update the orders and their index
      state.orders.findIndex((x) => x.table === table);
      let ordersList = state.orders.find((x) => x.table === table);

      //   Finding the orders according to the status
      const sameStatusOrders = ordersList.orders[status];

      // Order Which have to move
      const orderToUpdate = sameStatusOrders.find((x) => x.id === id);

      // Selecting the index to remove
      const innerIndex = sameStatusOrders.findIndex(
        (x) => x.id === orderToUpdate.id
      );

      // Removing an item from already exists menu
      ordersList.orders[status].splice(innerIndex, 1);

      switch (type) {
        case "Ready": {
          // Pushing Order into ready state
          ordersList.orders["ready"].push(orderToUpdate);
          break;
        }
        case "Reject": {
          // Pushing Order into Rejected state
          ordersList.orders["rejected"].push(orderToUpdate);
          break;
        }
        case "On preparation": {
          // Pushing Order into preparation state
          ordersList.orders["preparation"].push(orderToUpdate);
          break;
        }
        default: {
          break;
        }
      }
    },
    updateAllOrdersOfTable: (state, actions) => {
      const { type, table } = actions.payload;

      //   Finding the table in which have to update the orders and their index
      let index = state.orders.findIndex((x) => x.table === table);
      let ordersList = state.orders.find((x) => x.table === table);

      const preaprationItems = ordersList.orders.preparation;

      state.orders[index].orders.preparation = [];

      switch (type) {
        case "Reject All": {
          state.orders[index].orders.rejected = [
            ...state.orders[index].orders.rejected,
            ...preaprationItems,
          ];
          break;
        }
        case "Prepare All": {
          state.orders[index].orders.ready = [
            ...state.orders[index].orders.ready,
            ...preaprationItems,
          ];
          break;
        }
        default: {
          break;
        }
      }
    },
  },
});

export const { splitCard, updateOrderStatus, updateAllOrdersOfTable } =
  ordersSlice.actions;

export default ordersSlice.reducer;
