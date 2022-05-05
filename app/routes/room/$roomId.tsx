import { useState, useEffect } from "react";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { getToken } from "~/utils";
import type { Participant } from "twilio-video";
import ParticipantVideo from "~/components/participant";
import Video from "twilio-video";

export const loader: LoaderFunction = async ({ params, request }) => {
  console.log(params, request, "request");
  return json({
    roomId: params.roomId,
    user: await requireUserId(request),
  });
};

export default function RoomCall() {
  const [room, setRoom] = useState<Video.Room | null>(null);
  const { roomId, user } = useLoaderData();
  const [participants, setParticipants] = useState<Participant[]>([]);

  const participantConnected = (participant: Participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  useEffect(() => {
    getToken(roomId, user).then((token) => {
      Video.connect(token, {
        name: roomId,
      }).then((room) => {
        setRoom(room);
      });
    });
  }, []);

  useEffect(() => {
    if (room) {
      room.on("participantConnected", participantConnected);
      room.participants.forEach(participantConnected);
    }
  }, [room]);

  const remoteParticipants = participants?.map((participant) => (
    <ParticipantVideo key={participant.sid} participant={participant} />
  ));

  return (
    <div>
      {room && (
        <>
          <ParticipantVideo participant={room?.localParticipant} />
          {remoteParticipants}
        </>
      )}
      <Link to="/home">Salir</Link>
    </div>
  );
}
