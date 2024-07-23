import React from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function SocketIO() {
  const [room, setRoom] = React.useState("");

  const [message, setMessage] = React.useState("");

  const [receivedMessage, setReceivedMessage] = React.useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sent_message", {
      message: message,
      room: room,
    });
    setMessage("");
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room: room });
    }
  };
  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="join room ..."
        />
        <button onClick={joinRoom}>joinRoom</button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message ..."
        />
        <button onClick={sendMessage}>Send</button>
        <br />
        <div>
          <h4>Message:</h4>
          <span>{receivedMessage}</span>
        </div>
      </div>
    </>
  );
}

export default SocketIO;
