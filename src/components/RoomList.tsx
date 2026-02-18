interface Room {
  id: string;
  name: string;
  unread: number;
}

interface RoomListProps {
  rooms: Room[];
  activeRoom: string;
  onSelectRoom: (id: string) => void;
  user: { username: string };
  onLogout: () => void;
  visible: boolean;
}

export function RoomList({ rooms, activeRoom, onSelectRoom, user, onLogout, visible }: RoomListProps) {
  return (
    <aside className={`room-list ${visible ? 'visible' : ''}`}>
      <div className="room-header">
        <h2>Rooms</h2>
        <span className="user-badge">{user.username}</span>
      </div>
      <nav className="rooms">
        {rooms.map(room => (
          <button
            key={room.id}
            className={`room-item ${room.id === activeRoom ? 'active' : ''}`}
            onClick={() => onSelectRoom(room.id)}
          >
            <span className="room-hash">#</span>
            <span className="room-name">{room.name}</span>
            {room.unread > 0 && <span className="unread-badge">{room.unread}</span>}
          </button>
        ))}
      </nav>
      <button className="logout-btn" onClick={onLogout}>Sign Out</button>
    </aside>
  );
}
