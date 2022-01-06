import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PauseSvg from "../../../images/pause.svg";
import PlaySvg from "../../../images/play.svg";
import VolumeUpSvg from "../../../images/volume_up.svg";
import VolumeOffSvg from "../../../images/volume_off.svg";
import SettingSvg from "../../../images/settings.svg";
import SpeedSvg from "../../../images/speed.svg";
import RepeatSvg from "../../../images/repeat.svg";
import FullscreenSvg from "../../../images/fullscreen.svg";
import ExitFullscreenSvg from "../../../images/fullscreen_exit.svg";
import DownloadIcon from "../../../images/download.svg";
import MoreIcon from "../../../images/more.svg";
import "./controls.scss";

import { changePlaybackRate, mute, pause, play, toggleLooping, unmute } from "../../actions/videoPlayerActions";
import { Popup } from "../popup/Popup";
import { exitFullscreen, requestFullscreen } from "../../actions/applicationAction";
import { RootState } from "../../recucers/rootReducer";
import { VolumeSlider } from "../volumeslider/VolumeSlider";


export type ControlsProps = {
    currentTime: number,
    duration: number,
    onMoreSettingSelected: () => void
    downloadHref: string
}

export const Controls: React.FC<ControlsProps> = ({ currentTime, duration, onMoreSettingSelected, downloadHref }) => {
    const isFullscreen = useSelector<RootState, boolean>(reduxState => reduxState.application.isFullscreen);
    const isPlaying = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isPlaying);
    const isMuted = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isMuted);
    const isLooping = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isLooping);
    const playbackRate = useSelector<RootState, number>(reduxState => reduxState.videoPlayer.playbackRate);
    const dispatch = useDispatch();

    const [isPlaybackSpeedPopupClosed, setIsPlaybackSpeedPopupClosed] = React.useState(true);
    const [isSettingPopupClosed, setIsSettingPopupClosed] = React.useState(true);

    React.useEffect(() => {
        if (!isPlaybackSpeedPopupClosed) {
            setIsSettingPopupClosed(true);
        }
    }, [isPlaybackSpeedPopupClosed]);

    React.useEffect(() => {
        if (!isSettingPopupClosed) {
            setIsPlaybackSpeedPopupClosed(true);
        }
    }, [isSettingPopupClosed]);

    return <div className="controls-component">
        <div className="controls-component-start">
            {isPlaying
                ? <button onClick={() => dispatch(pause())}>
                    <PauseSvg/>
                </button>
                : <button onClick={() => dispatch(play())}>
                    <PlaySvg/>
                </button>}

            {isMuted
                ? <button onClick={() => dispatch(unmute())}>
                    <VolumeOffSvg/>
                </button>
                : <button onClick={() => dispatch(mute())}>
                    <VolumeUpSvg/>
                </button>
            }
            <VolumeSlider/>
        </div>

        <div className="current-time">
            <span>{formatSecond(currentTime)}</span>
            <span>/</span>
            <span>{formatSecond(duration)}</span>
        </div>

        <div className="controls-component-end">
            <div className="setting-control">
                <button onClick={() => setIsSettingPopupClosed(!isSettingPopupClosed)}>
                    <SettingSvg/>
                </button>
                <Popup closed={isSettingPopupClosed}>
                    <div className="setting-options-wrapper popup-content"
                         onMouseLeave={() => setIsSettingPopupClosed(true)}>
                        <a href={downloadHref} download={(() => {
                            const temp = downloadHref.split("/");
                            return temp[temp.length - 1];
                        })()}>
                            <button disabled={downloadHref.startsWith("file://")}>
                                <DownloadIcon/>
                                Download
                            </button>
                        </a>
                        <button onClick={() => onMoreSettingSelected()}>
                            <MoreIcon/>
                            More
                        </button>
                    </div>
                </Popup>
            </div>

            <div className="playback-rate-control">
                <button onClick={() => setIsPlaybackSpeedPopupClosed(!isPlaybackSpeedPopupClosed)}>
                    <SpeedSvg/>
                </button>
                <Popup closed={isPlaybackSpeedPopupClosed}>
                    <div className="playback-rate-options-wrapper popup-content"
                         onMouseLeave={() => setIsPlaybackSpeedPopupClosed(true)}>
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(s => {
                            return <button key={s}
                                           className={`playback-rate-option ${playbackRate === s ? "active" : ""}`}
                                           onClick={() => dispatch(changePlaybackRate((s)))}>
                                {s === 1 ? "Normal" : s}
                            </button>;
                        })}
                    </div>
                </Popup>
            </div>

            <button className={isLooping ? "active" : ""}
                    onClick={() => dispatch(toggleLooping())}>
                <RepeatSvg/>
            </button>

            {isFullscreen
                ? <button onClick={() => dispatch(exitFullscreen())}>
                    <ExitFullscreenSvg/>
                </button>
                : <button onClick={() => dispatch(requestFullscreen())}>
                    <FullscreenSvg/>
                </button>}
        </div>
    </div>;
};

export function formatSecond(sec: number): string {
    const options = {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
    };
    sec = Math.round(sec);
    const min = Math.floor(sec / 60);
    sec -= min * 60;
    return `${min.toLocaleString("number", options)}:${sec.toLocaleString("number", options)}`;
}