import Phone from "./Phone";
import Camera from "./Camera";
import Microphone from "./Microphone";
import Users from "./Users";
import Info from "./Info";
import Video from "./Video";

type Props = {
  name: "phone" | "camera" | "microphone" | "users" | "info" | "video";
  className: string;
};

export default function Icon({ name, className }: Props): JSX.Element {
  switch (name) {
    case "phone":
      return <Phone className={className} />;
    case "camera":
      return <Camera className={className} />;
    case "microphone":
      return <Microphone className={className} />;
    case "users":
      return <Users className={className} />;
    case "info":
      return <Info className={className} />;
    case "video":
      return <Video className={className} />;
    default:
      return <p>There isn't icon</p>;
  }
}
