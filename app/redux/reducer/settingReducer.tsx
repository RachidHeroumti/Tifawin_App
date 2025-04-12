import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterFormat } from '../../core/tools';



const initialState: any={};

const SettingsHolder = createSlice({
  name: 'settingsholder',
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<any>) {
      return action.payload; 
    },
    resetSettings(state) {
      return initialState;
    },
    
  },
});

export const { setSettings, resetSettings } = SettingsHolder.actions;
export default SettingsHolder.reducer;
