import { useEffect } from "react";
function Toast({
  message,
  type,
  duration = 3000,
  toggleToast,
  setToggleToast,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToggleToast(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, setToggleToast]);

  return toggleToast ? (
    <div
      className={`absolute bottom-4 z-30 p-2 rounded-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p>{message}</p>
    </div>
  ) : null;
}

export default Toast;
