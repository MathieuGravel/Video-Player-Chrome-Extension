import { ApplicationAction } from "../actions/applicationAction";


export type ApplicationState = {
    isFullscreen: boolean
}

const initialState: ApplicationState = {
    isFullscreen: false
};

export const applicationReducer = (state: ApplicationState = initialState, action: ApplicationAction): ApplicationState => {
    switch (action.type) {
        case "REQUEST_FULLSCREEN":
            return { ...state, isFullscreen: true };
        case "EXIT_FULLSCREEN":
            return { ...state, isFullscreen: false };
        case "TOGGLE_FULLSCREEN":
            return { ...state, isFullscreen: !state.isFullscreen };
        default:
            return state;
    }
};