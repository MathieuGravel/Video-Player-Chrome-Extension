import React from "react";

import "./video-preview.scss";
import { formatSecond } from "../controls/Controls";


export type VideoPreviewProps = {
    src: string;
    time: number;
    visible: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ src, time, visible }) => {
    const videoPreviewRef = React.useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const timeRef = React.useRef(0);

    if (videoRef.current && videoPreviewRef.current) {
        videoPreviewRef.current.style.setProperty("--position", `${time / videoRef.current.duration * 100}%`);
        const timeSec = Math.round(time * 10) / 10;
        if (timeRef.current !== timeSec) {
            timeRef.current = timeSec;
            videoRef.current.currentTime = time;
        }
    }

    return <div ref={videoPreviewRef} className="video-preview-component" hidden={!visible}>
        <div className="preview-wrapper">
            <div className="video-wrapper">
                <video ref={videoRef} src={src}/>
            </div>
            <span>{formatSecond(time)}</span>
        </div>
    </div>;
};