import { combineReducers } from "redux";
import selectedCityReducer from "./selectedCityReducer";
import sliderItemsReducer from "./sliderItemsReducer";

export const rootReducer = combineReducers({
    sliderItems: sliderItemsReducer,
    selectedCity: selectedCityReducer
})