import { useCallback, useEffect, useState } from "react";

const useWebcamDevices = () => {
  const [webcamDevices, setWebcamDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setWebcamDevices(
        mediaDevices.filter(({ kind }) => kind === "videoinput")
      ),
    []
  );

  useEffect(() => {
    void navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return { webcamDevices };
};

export default useWebcamDevices;
