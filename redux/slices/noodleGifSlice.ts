import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoodleGifState {
  noodleGifUrl: string;
}

const initialState: NoodleGifState = {
  noodleGifUrl: '',
};

const noodleGifSlice = createSlice({
  name: 'noodleGif',
  initialState,
  reducers: {
    setNoodleGifUrl: (state, action: PayloadAction<string>) => {
      state.noodleGifUrl = action.payload;
    },
  },
});

export const { setNoodleGifUrl } = noodleGifSlice.actions;

export default noodleGifSlice.reducer;
