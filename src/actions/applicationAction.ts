export type ApplicationAction = {
    type: "REQUEST_FULLSCREEN" | "EXIT_FULLSCREEN" | "TOGGLE_FULLSCREEN"
}

export const requestFullscreen = (): ApplicationAction => {
    return {
        type: "REQUEST_FULLSCREEN"
    };
};

export const exitFullscreen = (): ApplicationAction => {
    return {
        type: "EXIT_FULLSCREEN"
    };
};

export const toggleFullscreen = (): ApplicationAction => {
    return {
        type: "TOGGLE_FULLSCREEN"
    };
};