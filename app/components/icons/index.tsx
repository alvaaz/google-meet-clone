import Phone from "./Phone";
import Camera from "./Camera";
import Microphone from "./Microphone";
import Users from "./Users";
import Info from "./Info";
import Video from "./Video";
import Rooms from "./Rooms";
import Secure from "./Secure";
import Screen from "./Screen";
import Chat from "./Chat";

type Props = {
  name:
    | "phone"
    | "camera"
    | "microphone"
    | "users"
    | "info"
    | "video"
    | "rooms"
    | "secure"
    | "screen"
    | "chat";
  className: string;
  off?: boolean;
};

export default function Icon({ name, className, off }: Props): JSX.Element {
  switch (name) {
    case "phone":
      return <Phone className={className} />;
    case "camera":
      return <Camera className={className} off={off} />;
    case "microphone":
      return <Microphone className={className} off={off} />;
    case "users":
      return <Users className={className} />;
    case "info":
      return <Info className={className} />;
    case "video":
      return <Video className={className} />;
    case "rooms":
      return <Rooms className={className} />;
    case "chat":
      return <Chat className={className} />;
    case "secure":
      return <Secure className={className} />;
    case "screen":
      return <Screen className={className} />;
    default:
      return <p>There isn't icon</p>;
  }
}
