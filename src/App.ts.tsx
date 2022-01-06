import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./app.scss";

import { VideoPlayer } from "./components/videoplayer/VideoPlayer";
import { freezeVideoPlayer, pause, play, setCurrentTime, unfreezeVideoPlayer } from "./actions/videoPlayerActions";
import { PopupWindow } from "./components/popupwindow/PopupWindow";
import { TimelineBar } from "./components/timelinebar/TimelineBar";
import { Controls } from "./components/controls/Controls";
import { RootState } from "./recucers/rootReducer";
import { Setting } from "./components/setting/Setting";
import { VideoPreview } from "./components/videopreview/VideoPreview";


export const App: React.FC = () => {
    const videoSrc = document.location.href;
    const isFullscreen = useSelector<RootState, boolean>(reduxState => reduxState.application.isFullscreen);
    const isPlaying = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isPlaying);

    const [isPopupVisible, setIsPopupVisible] = React.useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);

    const [mouseMoving, setMouseMoving] = React.useState(false);
    const mouseMovingTimeout = React.useRef<ReturnType<typeof setTimeout>>();

    const [previewTime, setPreviewTime] = React.useState(0);
    const [videoDuration, setVideoDuration] = React.useState(0);
    const [controlCurrentTime, setControlCurrentTime] = React.useState(0);
    const [controlBufferEnd, setControlBufferEnd] = React.useState<number>();

    const appRef = React.useRef<HTMLDivElement>(null);
    const tempIsPlaying = React.useRef(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isPopupVisible) {
            tempIsPlaying.current = isPlaying;
            dispatch(pause());
            dispatch(freezeVideoPlayer());
        } else {
            dispatch(unfreezeVideoPlayer());
            if (tempIsPlaying.current) dispatch(play());
        }
    }, [isPopupVisible]);

    React.useEffect(() => {
        const app = appRef.current;
        if (!app) return;
        if (isFullscreen && document.fullscreenEnabled && !document.fullscreenElement) {
            app.requestFullscreen().catch(console.error);
        } else if (document.fullscreenElement === app) {
            document.exitFullscreen().catch(console.error);
        }
    }, [isFullscreen]);

    return <div className={`app-component ${isFullscreen ? "fullscreen" : ""} ${mouseMoving ? "mouse-moving" : ""}`}
                ref={appRef}>
        <div className="video-wrapper" onMouseMove={() => {
            if (mouseMovingTimeout.current) clearTimeout(mouseMovingTimeout.current);
            mouseMovingTimeout.current = setTimeout(() => setMouseMoving(false), 2000);
            if (!mouseMoving) setMouseMoving(true);
        }}>
            <VideoPlayer src={videoSrc}
                         onLoadedMetadata={metadata => setVideoDuration(metadata.duration)}
                         onTimeUpdate={data => {
                             setControlCurrentTime(data.currentTime);
                             setControlBufferEnd(data.bufferEnd);
                         }}/>

            <div className="controls">
                <VideoPreview src={videoSrc} time={previewTime} visible={isPreviewVisible}/>
                <TimelineBar currentTime={controlCurrentTime}
                             duration={videoDuration}
                             bufferEnd={controlBufferEnd}
                             onTimeSelect={time => dispatch(setCurrentTime(time))}
                             onTimeHover={time => setPreviewTime(time)}
                             onMouseEnter={() => setIsPreviewVisible(true)}
                             onMouseLeave={() => setIsPreviewVisible(false)}/>

                <Controls currentTime={controlCurrentTime}
                          duration={videoDuration}
                          downloadHref={videoSrc}
                          onMoreSettingSelected={() => setIsPopupVisible(true)}/>
            </div>
        </div>
        <PopupWindow onCloseWindow={() => setIsPopupVisible(false)} visible={isPopupVisible}>
            <Setting/>
        </PopupWindow>
    </div>;
};