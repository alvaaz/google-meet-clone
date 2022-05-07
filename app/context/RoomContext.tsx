import type { FC, Dispatch, SetStateAction } from "react";
import { useState, createContext, useContext } from "react";
import type Video from "twilio-video";
import type { Participant } from "twilio-video";

type RoomState = {
  userVideo: boolean;
  userAudio: boolean;
  toggleUserVideo: () => void;
  toggleUserAudio: () => void;
  room: Video.Room | null;
  setRoom: Dispatch<SetStateAction<Video.Room | null>>;
  participantConnected: (participant: Participant) => void;
  participants: Participant[];
};

function createCtx<RoomState>() {
  const ctx = createContext<RoomState | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useRoomContext, RoomContextProvider] = createCtx<RoomState>();

export const RoomProvider: FC = ({ children }) => {
  const [room, setRoom] = useState<Video.Room | null>(null);
  const [userVideo, setUserVideo] = useState<boolean>(true);
  const [userAudio, setUserAudio] = useState<boolean>(true);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const participantConnected = (participant: Participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const toggleUserVideo = () => {
    if (!room || !room.localParticipant) return;
    if (userVideo) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
    }
    setUserVideo(!userVideo);
  };

  const toggleUserAudio = () => {
    if (!room || !room.localParticipant) return;
    if (userAudio) {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
    }
    setUserAudio(!userAudio);
  };

  return (
    <RoomContextProvider
      value={{
        userVideo,
        toggleUserVideo,
        room,
        setRoom,
        toggleUserAudio,
        userAudio,
        participantConnected,
        participants,
      }}
    >
      {children}
    </RoomContextProvider>
  );
};
