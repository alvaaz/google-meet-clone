import { useRoomContext } from "~/context/RoomContext";
import Icon from "./icons/";

export default function CallFooter() {
  const { toggleUserVideo, toggleUserAudio, userVideo, userAudio } =
    useRoomContext();
  return (
    <div className="flex justify-between px-6 py-6 items-center">
      <p className="text-white">sdfsdfsdf</p>
      <div className="flex gap-3">
        <button
          className={`transition-all p-3 rounded-full ${
            userAudio
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={toggleUserAudio}
        >
          <Icon
            name="microphone"
            className="w-6 h-6 stroke-white"
            off={!userAudio}
          />
        </button>
        <button
          className={`transition-all p-3 rounded-full ${
            userVideo
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={toggleUserVideo}
        >
          <Icon
            name="camera"
            className="w-6 h-6 stroke-white"
            off={!userVideo}
          />
        </button>
        <a
          href="/home"
          className="transition-all bg-red-500 hover:bg-red-600 p-3 rounded-full px-6"
        >
          <Icon name="phone" className="w-6 h-6 stroke-white" />
        </a>
      </div>
      <div className="flex gap-3">
        <button className="transition-all bg-gray-900 hover:bg-gray-800 p-3 rounded-full">
          <Icon name="info" className="w-6 h-6 stroke-white" />
        </button>
        <button className="transition-all bg-gray-900 hover:bg-gray-800 p-3 rounded-full">
          <Icon name="users" className="w-6 h-6 stroke-white" />
        </button>
      </div>
    </div>
  );
}
