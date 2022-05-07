import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { getToken } from "~/utils";
import ParticipantVideo from "~/components/participant";
import Video from "twilio-video";
import CallFooter from "~/components/call-footer";
import { useRoomContext } from "~/context/RoomContext";

export const loader: LoaderFunction = async ({ params, request }) => {
  return json({
    roomId: params.roomId,
    user: await requireUserId(request),
  });
};

export default function RoomCall() {
  const { room, setRoom, participantConnected, participants } =
    useRoomContext();
  const { roomId, user } = useLoaderData();

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
    <div className="bg-gray-900 h-screen grid grid-rows-[auto_min-content]">
      {/* <div className="p-8 h-full">
        <div className="h-full relative">
          <div className="absolute w-full h-full">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://cdn.stocksnap.io/img-thumbs/960w/family-portrait_PMFIFSSCHD.jpg"
              alt=""
            />
            <span className="absolute left-4 bottom-4 text-white shadow-md z-10">
              Tú
            </span>
          </div>
          <div className="absolute right-4 bottom-4 w-3/12">
            <img
              className="object-cover rounded-lg"
              src="https://cdn.stocksnap.io/img-thumbs/960w/family-portrait_PMFIFSSCHD.jpg"
              alt=""
            />
            <span className="absolute left-4 bottom-4 text-white shadow-md z-10">
              Tú
            </span>
          </div>
        </div>
      </div> */}

      {/* <div className="p-8 grid place-content-center">
        <div className="overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative ">
            <img
              className="object-cover rounded-lg"
              src="https://cdn.stocksnap.io/img-thumbs/960w/family-portrait_PMFIFSSCHD.jpg"
              alt=""
            />
            <span className="absolute left-4 bottom-4 text-white shadow-md z-10">
              Tú
            </span>
          </div>
          <div className="relative ">
            <img
              className="object-cover rounded-lg"
              src="https://cdn.stocksnap.io/img-thumbs/960w/family-portrait_PMFIFSSCHD.jpg"
              alt=""
            />
            <span className="absolute left-4 bottom-4 text-white shadow-md z-10">
              Tú
            </span>
          </div>
        </div>
      </div> */}

      <div className="p-8 grid place-content-center">
        <div className="overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 gap-8">
          {room && (
            <>
              <ParticipantVideo participant={room?.localParticipant} />
              {remoteParticipants}
            </>
          )}
        </div>
      </div>

      {/* <div className="p-8 h-full">
        <div className="h-full overflow-hidden relative grid grid-cols-2 gap-8">
          {room && (
            <>
              <ParticipantVideo participant={room?.localParticipant} />
              {remoteParticipants}
            </>
          )}
        </div>
      </div> */}

      <CallFooter />
    </div>
  );
}
