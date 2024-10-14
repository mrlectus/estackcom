import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartTable } from "../drizzle/schema";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

const initialState: Array<CartTable & { quantity: number }> = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (
      state,
      action: PayloadAction<Array<CartTable & { quantity?: number }>>,
    ) => {
      const temp = action.payload.map((x) => ({ ...x, quantity: 1 }));
      state = temp;
      return state;
    },
    incremantCartById: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((x) => x.id === action.payload.id);
      if (index >= 0 && state.length >= 0) {
        state[index].quantity += 1;
      }
    },
    decrementCartById: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((x) => x.id === action.payload.id);
      if (index >= 0 && state.length >= 0) {
        if (state[index].quantity > 1) state[index].quantity -= 1;
      }
    },
  },
});
