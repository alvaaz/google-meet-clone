import { useRef, useEffect, useState } from "react";
import { trackpubsToTracks } from "~/utils";

export default function ParticipantVideo({
  participant,
  className,
}: {
  participant: any;
  className?: string;
}) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); // video status
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(participant, "participant");
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    participant.on("trackSubscribed", (track: any) => {
      trackDisabled(track);
      trackEnabled(track);
      trackSubscribed(track);
    });

    participant.on("trackUnsubscribed", trackUnsubscribed);

    participant.tracks.forEach((publication: any) => {
      if (publication.track) {
        trackDisabled(publication.track);
        trackEnabled(publication.track);

        publication.track.on("disabled", (track: any) => trackDisabled(track));
        publication.track.on("enabled", (track: any) => trackEnabled(track));
      }
    });

    return () => {
      setVideoTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  const trackSubscribed = (track: any) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks: any) => [...videoTracks, track]);
    }
    track.on("disabled", (track: any) => trackDisabled(track));
    track.on("enabled", (track: any) => trackEnabled(track));
  };

  const trackUnsubscribed = (track: any) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks: any) =>
        videoTracks.filter((v: any) => v !== track)
      );
    }
  };

  const trackDisabled = (track: any) => {
    track.on("disabled", () => {
      if (track.kind === "video") {
        setIsVideoEnabled(false);
      }
    });
  };

  function trackEnabled(track: any) {
    track.on("enabled", () => {
      if (track.kind === "video") {
        setIsVideoEnabled(true);
      }
    });
  }

  return (
    <div className={`relative ${className}`}>
      <video
        className="h-full object-cover rounded-lg"
        ref={videoRef}
        playsInline
        autoPlay
      />
    </div>
  );
}
