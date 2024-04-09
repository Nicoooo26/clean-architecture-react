import { useEffect } from "react";

export default function LinkContesta() {
  useEffect(() => {
    window.location.href = `https://www.contesta.es/`;
  }, []);

  return null;
}
