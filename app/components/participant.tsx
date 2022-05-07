import { useRef, useEffect, useState } from "react";
import { trackpubsToTracks } from "~/utils";

export default function ParticipantVideo({
  participant,
  className,
}: {
  participant: any;
  className?: string;
}) {
  const [audioTracks, setAudioTracks] = useState<any>([]);
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));

    participant.on("trackSubscribed", (track: any) => {
      trackSubscribed(track);
    });

    participant.on("trackUnsubscribed", trackUnsubscribed);

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

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const trackSubscribed = (track: any) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks: any) => [...videoTracks, track]);
    } else if (track.kind === "audio") {
      setAudioTracks((audioTracks: any) => [...audioTracks, track]);
    }
  };

  const trackUnsubscribed = (track: any) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks: any) =>
        videoTracks.filter((v: any) => v !== track)
      );
    } else if (track.kind === "audio") {
      setAudioTracks((audioTracks: any) =>
        audioTracks.filter((a: any) => a !== track)
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        className="h-full object-cover rounded-lg"
        ref={videoRef}
        playsInline
        autoPlay
      />
      <audio ref={audioRef} autoPlay />
    </div>
  );
}
