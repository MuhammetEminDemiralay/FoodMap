import { Timestamp } from "firebase/firestore";

export interface FollowRequest {
    isSeen?: boolean,
    requestStatues?: boolean,
    followTo?: boolean,
    time?: Timestamp,
    receiverId: string
}