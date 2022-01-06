import React from "react";

import "./timeline-bar.scss";


export type TimelineBarProps = {
    currentTime: number,
    duration: number,
    bufferEnd?: number,
    onTimeSelect?: (time: number) => void,
    onTimeHover?: (time: number) => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
    currentTime,
    duration,
    bufferEnd,
    onTimeSelect,
    onTimeHover,
    onMouseEnter,
    onMouseLeave
}) => {

    const buffersElements = bufferEnd
        ? <div className="buffer-bar detail-bar" style={{ width: `${(bufferEnd / duration) * 100}%` }}/>
        : <></>;

    return <div className="timeline-bar-component"
                onClick={e => {
                    e.preventDefault();
                    const target: HTMLDivElement = e.target as HTMLDivElement;
                    const percentage = (e.clientX - target.getBoundingClientRect().left) / target.clientWidth;
                    const time = percentage * duration;
                    onTimeSelect?.call(null, time);
                    e.stopPropagation();
                }}
                onMouseMove={e => {
                    const target = e.currentTarget;
                    const selectRatio = (e.clientX - target.getBoundingClientRect().left) / target.clientWidth;
                    target.style.setProperty("--selection", `${selectRatio * 100}%`);
                    onTimeHover?.call(null, selectRatio * duration);
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
        <div className="time-bar detail-bar" style={{ width: `${(currentTime / duration) * 100}%` }}/>
        {buffersElements}
    </div>;
};