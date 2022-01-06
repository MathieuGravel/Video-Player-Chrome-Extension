import { combineReducers } from "redux";

import { videoPlayerReducer } from "./videoPlayerReducer";
import { applicationReducer } from "./applicationReducer";


const rootReducer = combineReducers({
    videoPlayer: videoPlayerReducer,
    application: applicationReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>