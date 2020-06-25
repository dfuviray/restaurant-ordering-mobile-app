import data from '../data/menu';
const initialState = {
  data: data,
  orders: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      const orders = [...state.orders, { ...action.item }];
      //
      return { orders: orders };

    case 'DECREASE_COUNTER':
      return { counter: state.counter - 1 };
  }
  return state;
};
