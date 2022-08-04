/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "settingStatus";

type Props = {
  setting: {
    isDisplayContact: boolean;
  };
};

const initialState: Props = {
  setting: {
    isDisplayContact: false,
  },
};

export const settingSlice = createSlice({
  name,
  initialState,
  reducers: {
    showSettingContact: (
      state,
      action: PayloadAction<{
        isDisplayContact?: boolean;
      }>,
    ) => {
      state.setting.isDisplayContact = !state.setting.isDisplayContact;
    },
  },
});

export const { showSettingContact } = settingSlice.actions;
export default settingSlice.reducer;
