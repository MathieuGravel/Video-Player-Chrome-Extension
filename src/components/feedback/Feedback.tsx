import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import Forward5Icon from "../../../images/forward_5.svg";
import Rewind5Icon from "../../../images/replay_5.svg";
import "./feedback.scss";

import { ForwardRewindRequest } from "../../recucers/videoPlayerReducer";
import { RootState } from "../../recucers/rootReducer";


export const Feedback: React.FC = ({}) => {
    const [isRewindVisible, setIsRewindVisible] = React.useState(false);
    const [isForwardVisible, setIsForwardVisible] = React.useState(false);

    const forwardRewindRequest = useSelector<RootState, ForwardRewindRequest>(videoPlayerState => videoPlayerState.videoPlayer.forwardRewindRequest);
    const isLoading = useSelector<RootState, boolean>(videoPlayerState => videoPlayerState.videoPlayer.isLoading);

    React.useEffect(() => {
        const setVisible = forwardRewindRequest.second == -5
            ? setIsRewindVisible
            : forwardRewindRequest.second === 5
                ? setIsForwardVisible
                : () => {
                };

        setVisible(true);
        setTimeout(() => setVisible(false), 250);
    }, [forwardRewindRequest]);

    return <div className="feedback-component">
        {isLoading ? <div className="loading">
            <CircularProgress/>
        </div> : <></>}
        <Rewind5Icon className="left" visibility={isRewindVisible ? "visible" : "hidden"}/>
        <Forward5Icon className="right" visibility={isForwardVisible ? "visible" : "hidden"}/>
    </div>;
};