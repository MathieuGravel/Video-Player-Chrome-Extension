export type VideoPlayerActions = {
    type: "PLAY"
        | "PAUSE"
        | "TOGGLE_PLAY_PAUSE"
        | "MUTE"
        | "UNMUTE"
        | "TOGGLE_MUTE"
        | "TOGGLE_LOOPING"
        | "FORWARD_REWIND_SEC"
        | "SET_PLAYBACK_RATE"
        | "FREEZE_VIDEO_PLAYER"
        | "UNFREEZE_VIDEO_PLAYER"
        | "SET_CURRENT_TIME"
        | "SET_VOLUME"
        | "SET_IS_LOADING",
    payload?: {
        second?: number,
        playbackRate?: number,
        time?: number,
        isLoading?: boolean,
        volume?: number
    }
}

export const play = (): VideoPlayerActions => {
    return {
        type: "PLAY",
    };
};

export const pause = (): VideoPlayerActions => {
    return {
        type: "PAUSE"
    };
};

export const togglePlayPause = (): VideoPlayerActions => {
    return {
        type: "TOGGLE_PLAY_PAUSE"
    };
};

export const mute = (): VideoPlayerActions => {
    return {
        type: "MUTE"
    };
};

export const unmute = (): VideoPlayerActions => {
    return {
        type: "UNMUTE"
    };
};

export const toggleMute = (): VideoPlayerActions => {
    return {
        type: "TOGGLE_MUTE"
    };
};

export const toggleLooping = (): VideoPlayerActions => {
    return {
        type: "TOGGLE_LOOPING"
    };
};

export const forwardRewindSec = (second: number): VideoPlayerActions => {
    return {
        type: "FORWARD_REWIND_SEC",
        payload: { second }
    };
};

export const changePlaybackRate = (playbackRate: number): VideoPlayerActions => {
    return {
        type: "SET_PLAYBACK_RATE",
        payload: { playbackRate }
    };
};

export const freezeVideoPlayer = (): VideoPlayerActions => {
    return {
        type: "FREEZE_VIDEO_PLAYER"
    };
};

export const unfreezeVideoPlayer = (): VideoPlayerActions => {
    return {
        type: "UNFREEZE_VIDEO_PLAYER"
    };
};

export const setCurrentTime = (time: number): VideoPlayerActions => {
    return {
        type: "SET_CURRENT_TIME",
        payload: { time }
    };
};

export const setVolume = (volume: number): VideoPlayerActions => {
    return {
        type: "SET_VOLUME",
        payload: { volume }
    };
};

export const setIsLoading = (isLoading: boolean): VideoPlayerActions => {
    return {
        type: "SET_IS_LOADING",
        payload: { isLoading }
    };
};