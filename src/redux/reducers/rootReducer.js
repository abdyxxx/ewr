import { combineReducers } from "redux";
import selectedCityReducer from "./selectedCityReducer";
import sliderItemsReducer from "./sliderItemsReducer";
import isAuthReducer from "./isAuthReducer";
import showDetailReducer from "./showDetailReducer";

export const rootReducer = combineReducers({
    sliderItems: sliderItemsReducer,
    selectedCity: selectedCityReducer,
    isAuth: isAuthReducer,
    showDetail: showDetailReducer
})