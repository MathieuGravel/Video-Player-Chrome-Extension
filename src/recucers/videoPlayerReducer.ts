import { VideoPlayerActions } from "../actions/videoPlayerActions";


export type ForwardRewindRequest = {
    second: number
}

export type SetCurrentTimeRequest = {
    time: number
}

export type VideoPlayerState = {
    isPlaying: boolean,
    isMuted: boolean,
    isLooping: boolean,
    playbackRate: number,
    forwardRewindRequest: ForwardRewindRequest,
    setCurrentTimeRequest: SetCurrentTimeRequest
    volume: number,
    isFrozen: boolean,
    isLoading: boolean
}

const initialState: VideoPlayerState = {
    isPlaying: true,
    isMuted: false,
    isLooping: false,
    playbackRate: 1,
    forwardRewindRequest: { second: 0 },
    setCurrentTimeRequest: { time: 0 },
    volume: 1,
    isFrozen: false,
    isLoading: false
};

export const videoPlayerReducer = (state: VideoPlayerState = initialState, action: VideoPlayerActions): VideoPlayerState => {
    switch (action.type) {
        case "FREEZE_VIDEO_PLAYER":
            return { ...state, isFrozen: true };
        case "UNFREEZE_VIDEO_PLAYER":
            return { ...state, isFrozen: false };
    }
    if (state.isFrozen) return state;

    switch (action.type) {
        case "PLAY":
            return { ...state, isPlaying: true };
        case "PAUSE":
            return { ...state, isPlaying: false };
        case "TOGGLE_PLAY_PAUSE":
            return { ...state, isPlaying: !state.isPlaying };
        case "MUTE":
            return { ...state, isMuted: true };
        case "UNMUTE":
            return { ...state, isMuted: false };
        case "TOGGLE_MUTE":
            return { ...state, isMuted: !state.isMuted };
        case "TOGGLE_LOOPING":
            return { ...state, isLooping: !state.isLooping };
        case "FORWARD_REWIND_SEC":
            return {
                ...state,
                forwardRewindRequest: { second: action.payload?.second ?? initialState.forwardRewindRequest.second }
            };
        case "SET_PLAYBACK_RATE":
            return { ...state, playbackRate: action.payload?.playbackRate ?? initialState.playbackRate };
        case "SET_CURRENT_TIME":
            return {
                ...state,
                setCurrentTimeRequest: { time: action.payload?.time ?? initialState.setCurrentTimeRequest.time }
            };
        case "SET_VOLUME":
            return { ...state, volume: action.payload?.volume ?? initialState.volume };
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: action.payload?.isLoading ?? initialState.isLoading
            };
        default:
            return state;
    }
};