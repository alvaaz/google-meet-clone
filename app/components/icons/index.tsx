import Phone from "./Phone";
import Camera from "./Camera";
import Microphone from "./Microphone";
import Users from "./Users";
import Info from "./Info";

type Props = {
  name: "phone" | "camera" | "microphone" | "users" | "info";
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
    default:
      return <p>There isn't icon</p>;
  }
}
