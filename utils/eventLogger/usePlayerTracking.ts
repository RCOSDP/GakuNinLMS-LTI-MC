import { useEffect } from "react";
import { usePlayerTrackingAtom } from "$store/playerTracker";

function usePlayerTracking() {
  const tracking = usePlayerTrackingAtom();
  useEffect(
    () => () => {
      // NOTE: アンマウント後はトラッキング不要なので取り除く
      tracking();
    },
    [tracking]
  );
  return tracking;
}

export default usePlayerTracking;
