import { create } from "zustand";

interface VoiceCommandStore {
  executeCommand: (command: string) => void;
  setCommandHandler: (command: string, handler: () => void) => void;
  commandHandlers: Record<string, () => void>;
}

export const useVoiceCommandStore = create<VoiceCommandStore>((set, get) => ({
  commandHandlers: {},
  executeCommand: (command: string) => {
    const { commandHandlers } = get();
    const handler = commandHandlers[command];
    if (handler) {
      handler();
    }
  },
  setCommandHandler: (command: string, handler: () => void) => {
    set((state) => ({
      commandHandlers: {
        ...state.commandHandlers,
        [command]: handler,
      },
    }));
  },
}));
