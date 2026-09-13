"use client";
import Pusher from "pusher-js";

// This check prevents the server from trying to initialize Pusher during SSR
export const pusherClient = typeof window !== "undefined" 
  ? new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    }) 
  : null;