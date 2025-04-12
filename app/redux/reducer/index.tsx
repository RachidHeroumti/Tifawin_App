import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import languageTracker from './languagesReducer'
import settings from './settingReducer'
const rootReducer = combineReducers({
    drawer: drawerReducer,
    settings:settings,
    languageTracker:languageTracker
});

export default rootReducer;