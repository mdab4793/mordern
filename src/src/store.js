import { configureStore, createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCount(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[num].count++;
    },

    addMin(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[num].count === 1 ? state[num].limit++ : state[num].count--;
    },

    //장바구니에 이미 담겨져있을땐 안담겨지고 없을때만 추가.
    addItem(state, action) {
      let found = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      if (found >= 0) {
        let copy = [...state];
        copy[found].count++;
        return copy;
      }
      state.push(action.payload);
    },
    removeItem(state, action) {
      return state.filter((a) => a.id !== action.payload);
    },
  },
});

export let { addCount, addMin, addItem, removeItem } = cart.actions;

export default configureStore({
  //다른곳에서 쓰려면등록   등록하는곳
  reducer: {
    cart: cart.reducer,
  },
});
