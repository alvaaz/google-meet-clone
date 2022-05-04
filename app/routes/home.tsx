import type { LoaderFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { requireUserId } from "~/utils/auth.server";
import { jwt } from "twilio";
import { FormField } from "~/components/form-field";
import TwilioVideo from "twilio-video";

const Video = ({ token }: { token: string }) => {
  const localVidRef = useRef<HTMLDivElement>(null);
  const remoteVidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    TwilioVideo.connect(token, {
      video: true,
      audio: true,
      name: "test",
    }).then((room) => {
      // Attach the local video
      TwilioVideo.createLocalVideoTrack().then((track) => {
        localVidRef.current?.appendChild(track.attach());
      });

      const addParticipant = (participant: any) => {
        participant.tracks.forEach((publication: any) => {
          if (publication.isSubscribed) {
            const track = publication.track;
            remoteVidRef.current?.appendChild(track?.attach());
          }
        });
        participant.on("trackSubscribed", (track: any) => {
          remoteVidRef.current?.appendChild(track?.attach());
        });
      };

      room.on("participantConnected", addParticipant);
      room.participants.forEach(addParticipant);
    });
  }, [token]);

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const AccessToken = jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const generateToken = () => {
    return new AccessToken(
      process.env.TWILIO_ACCOUNT_SID as string,
      process.env.TWILIO_API_KEY_SID as string,
      process.env.TWILIO_API_SECRET as string
    );
  };

  const videoToken = (identity: any, room: any) => {
    let videoGrant;
    if (room) {
      videoGrant = new VideoGrant({
        room,
      });
    } else {
      videoGrant = new VideoGrant();
    }
    const token = generateToken();
    token.addGrant(videoGrant);
    token.identity = identity;
    return token;
  };

  const sendTokenResponse = (token: any) => {
    const body = JSON.stringify({
      token: token.toJwt(),
    });
    return new Response(body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const token = videoToken("hola", "room");

  sendTokenResponse(token);

  await requireUserId(request);
  return null;
};

export default function Home() {
  const [token, setToken] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    room: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "https://jade-caiman-4432.twil.io/create-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity: formData.name,
        }),
      }
    );
    setToken(await response.json());
  };

  return (
    <div>
      {token ? (
        <Video token={token} />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormField
            htmlFor="name"
            label="Name"
            placeholder="Ingresa tu nombre"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
          <FormField
            htmlFor="room"
            label="Room"
            placeholder="Ingresa tu room"
            type="text"
            value={formData.room}
            onChange={(e) => handleInputChange(e, "room")}
          />
          <button>Entrar</button>
        </form>
      )}
    </div>
  );
}
