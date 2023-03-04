import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authorReducer, categoryReducer, kitchenReducer, recipeReducer} from "./slices";

const rootReducer = combineReducers({
	authorReducer,
	recipeReducer,
	categoryReducer,
	kitchenReducer
});

const setupStore = () => configureStore({
	reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore["dispatch"]

export type {
	RootState,
	AppStore,
	AppDispatch
};

export {
	setupStore
};

