"use client";

import { useEffect } from "react";

interface ClientClassManagerProps {
  fontClasses: string[];
}

export default function ClientClassManager({ fontClasses }: ClientClassManagerProps) {
  useEffect(() => {
    // Apply the classes on the client side
    document.body.classList.add(
      ...fontClasses,
      "antialiased", 
      "flex", 
      "flex-col", 
      "min-h-screen"
    );
  }, [fontClasses]);
  
  return null;
} 