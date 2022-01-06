import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./video-player.scss";

import { pause, setCurrentTime, setIsLoading, togglePlayPause } from "../../actions/videoPlayerActions";
import { ForwardRewindRequest, SetCurrentTimeRequest } from "../../recucers/videoPlayerReducer";
import { Feedback } from "../feedback/Feedback";
import { RootState } from "../../recucers/rootReducer";


export type VideoPlayerMetadata = {
    duration: number
}

export type TimeUpdateData = {
    currentTime: number,
    bufferEnd: number
}

export type VideoPlayerProps = {
    src: string,
    onLoadedMetadata: (metadata: VideoPlayerMetadata) => void
    onTimeUpdate: (data: TimeUpdateData) => void
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onLoadedMetadata, onTimeUpdate }) => {
    const isPlaying = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isPlaying);
    const isMuted = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isMuted);
    const isLooping = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isLooping);
    const isLoading = useSelector<RootState, boolean>(reduxState => reduxState.videoPlayer.isLoading);
    const forwardRewindRequest = useSelector<RootState, ForwardRewindRequest>(reduxState => reduxState.videoPlayer.forwardRewindRequest);
    const setCurrentTimeRequest = useSelector<RootState, SetCurrentTimeRequest>(reduxState => reduxState.videoPlayer.setCurrentTimeRequest);
    const playbackRate = useSelector<RootState, number>(reduxState => reduxState.videoPlayer.playbackRate);
    const volume = useSelector<RootState, number>(reduxState => reduxState.videoPlayer.volume);
    const dispatch = useDispatch();

    const videoPlayerRef = React.useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play().catch(console.error);
        } else {
            videoRef.current?.pause();
        }
    }, [isPlaying]);

    React.useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = isMuted;
        }
    }, [isMuted]);

    React.useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.loop = isLooping;
        }
    }, [isLooping]);

    React.useEffect(() => {
        const video = videoRef.current;
        const { second } = forwardRewindRequest;
        if (second && video) {
            video.currentTime += second;
        }
    }, [forwardRewindRequest]);

    React.useEffect(() => {
        const video = videoRef.current;
        const { time } = setCurrentTimeRequest;
        if (video) {
            video.currentTime = time;
        }
    }, [setCurrentTimeRequest]);

    React.useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    React.useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = volume;
        }
    }, [volume]);

    return <div className="video-player-component" ref={videoPlayerRef}>
        <video ref={videoRef}
               src={src}
               onClick={() => dispatch(togglePlayPause())}
               onWaiting={() => dispatch(setIsLoading(true))}
               onTimeUpdate={() => {
                   if (isLoading) dispatch(setIsLoading(false));
                   onTimeUpdate({
                       currentTime: videoRef.current?.currentTime ?? 0,
                       bufferEnd: videoRef.current?.buffered.length ? videoRef.current.buffered.end(0) : 0
                   });
               }}
               onLoadedMetadata={() => onLoadedMetadata({ duration: videoRef.current?.duration ?? 0 })}
               onEnded={() => {
                   dispatch(setCurrentTime(0));
                   dispatch(pause());
               }}
        />
        <Feedback/>
    </div>;
};