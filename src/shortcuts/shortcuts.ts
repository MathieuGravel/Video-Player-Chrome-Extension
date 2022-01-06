import { Store } from "redux";

import { forwardRewindSec, setVolume, toggleLooping, toggleMute, togglePlayPause } from "../actions/videoPlayerActions";
import { toggleFullscreen } from "../actions/applicationAction";


const TOGGLE_PLAY_PAUSE = "Space + keydown";
const TOGGLE_FULL_SCREEN_SHORTCUT = "F + keydown";
const TOGGLE_MUTED_SHORTCUT = "M + keydown";
const TOGGLE_LOOPING_SHORTCUT = "L + keydown";
const FORWARD_SEC_SHORTCUT = "Arrow Right + keydown";
const REWIND_SEC_SHORTCUT = "Arrow Left + keydown";
const VOLUME_UP_SHORTCUT = "Arrow Up + keydown";
const VOLUME_DOWN_SHORTCUT = "Arrow Down + keydown";

const DEFAULT_FORWARD_REWIND_TIME = 5;

export type Shortcut = {
    shortcutString: string,
    action: (store: Store) => void,
    description: string;
}

export const shortcuts: Shortcut[] = [
    {
        shortcutString: TOGGLE_FULL_SCREEN_SHORTCUT,
        action: store => store.dispatch(toggleFullscreen()),
        description: "Enter / Exit fullscreen mode."
    },
    {
        shortcutString: TOGGLE_PLAY_PAUSE,
        action: store => store.dispatch(togglePlayPause()),
        description: "Play / Pause the video."
    },
    {
        shortcutString: TOGGLE_MUTED_SHORTCUT,
        action: store => store.dispatch(toggleMute()),
        description: "Mute / Unmute the video."
    },
    {
        shortcutString: TOGGLE_LOOPING_SHORTCUT,
        action: store => store.dispatch(toggleLooping()),
        description: "Toggle looping option on the video."
    },
    {
        shortcutString: FORWARD_SEC_SHORTCUT,
        action: store => store.dispatch(forwardRewindSec(DEFAULT_FORWARD_REWIND_TIME)),
        description: `Forward video by ${DEFAULT_FORWARD_REWIND_TIME} seconds.`
    },
    {
        shortcutString: REWIND_SEC_SHORTCUT,
        action: store => store.dispatch(forwardRewindSec(-DEFAULT_FORWARD_REWIND_TIME)),
        description: `Rewind video by ${DEFAULT_FORWARD_REWIND_TIME} seconds.`
    },
    {
        shortcutString: VOLUME_UP_SHORTCUT,
        action: store => dispatchNewVolume(store, 0.05),
        description: "Increase volume by 5%."
    },
    {
        shortcutString: VOLUME_DOWN_SHORTCUT,
        action: store => dispatchNewVolume(store, -0.05),
        description: "Decrease volume by 5%"
    }
];

function dispatchNewVolume(store: Store, volumeStep: number) {
    let newVolume = store.getState().videoPlayer.volume + volumeStep;
    if (newVolume < 0) newVolume = 0;
    if (newVolume > 1) newVolume = 1;
    store.dispatch(setVolume(newVolume));
}