import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import EN from "../../locales/EN.json";
import FR from "../../locales/FR.json";
import AR from "../../locales/AR.json";

// Define the Translations interface
interface Translations {
  [key: string]: string;
}

// Define the state interface
interface LanguageState {
  language: string;
  translations: Translations;
}

// Ensure JSON files are properly typed
const translationsMap: Record<string, Translations> = {
  EN,
  FR,
  AR,
};

const initialState: LanguageState = {
  language: "EN",
  translations: translationsMap["EN"],
};

const LanguageTracker = createSlice({
  name: "languageTracker",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      if (translationsMap[action.payload]) {
        state.language = action.payload;
        state.translations = translationsMap[action.payload];
      }
    },
    resetLanguage() {
      return initialState;
    },
  },
});

export const { setLanguage, resetLanguage } = LanguageTracker.actions;
export default LanguageTracker.reducer;
