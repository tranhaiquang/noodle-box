import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoodleState {
  noodleCounts: {
    heartNoodle: number;
    smileNoodle: number;
    winkNoodle: number;
  };
}

const initialState: NoodleState = {
  noodleCounts: {
    heartNoodle: 0,
    smileNoodle: 0,
    winkNoodle: 0,
  },
};

const noodleCountSlice = createSlice({
  name: "noodles",
  initialState,
  reducers: {
    setNoodleCounts: (state, action: PayloadAction<{ heartNoodle: number; smileNoodle: number; winkNoodle: number }>) => {
      state.noodleCounts = action.payload;
    },
  },
});

export const { setNoodleCounts } = noodleCountSlice.actions;

export default noodleCountSlice.reducer;
