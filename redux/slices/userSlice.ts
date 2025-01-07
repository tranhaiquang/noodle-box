import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: {
    name: string;
    birthday: string | null;
    department: string;
    avatarUrl: string;
    gender: string;
  };
}

const initialState: UserState = {
  userData: {
    name: "",
    birthday: null,
    department: "",
    avatarUrl: "",
    gender: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        name: string;
        birthday: string | null;
        department: string;
        avatarUrl: string;
        gender: string;
      }>
    ) => {
      state.userData = action.payload;
    },
  },
});

// Export actions
export const { setUserData } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
