import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_API_URL || 'http://localhost:4001';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connected, id:', socket.id);
    });
    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
}
