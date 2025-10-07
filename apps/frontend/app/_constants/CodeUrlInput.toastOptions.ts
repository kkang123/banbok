import type { ToastOptions } from "react-hot-toast";

const commonToastOptions: ToastOptions = {
  duration: 3000,
  style: {
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "20px",
    fontWeight: "bold",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    backdropFilter: "blur(4px)",
    textAlign: "center" as const,
  },
};

export const successToastOptions = {
  ...commonToastOptions,
  style: {
    ...commonToastOptions.style,
    background: "rgba(37, 99, 235, 0.9)",
  },
};

export const errorToastOptions = {
  ...commonToastOptions,
  icon: "⚠️",
  style: {
    ...commonToastOptions.style,
    background: "#808080",
  },
};
