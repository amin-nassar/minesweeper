import { useCallback, useEffect, useState } from "react";

const SOUNDS = {
  FLAG_PLACE: "flag_place.wav",
  FLAG_REMOVE: "flag_remove.wav",
  GAME_OVER: "game_over.wav",
  GAME_WIN: "game_win.wav",
  REVEAL_EMPTY: "reveal_empty.wav",
  REVEAL_NUMBER: "reveal_number.wav",
} as const;

type SoundName = keyof typeof SOUNDS;
type SoundMap = Record<SoundName, HTMLAudioElement>;

export default function useSFX() {
  const [soundMap, setSoundMap] = useState<SoundMap | null>(null);

  useEffect(() => {
    if (soundMap) return;
    const map = {} as SoundMap;

    for (const soundName in SOUNDS) {
      const sound = soundName as SoundName;
      const soundPath = SOUNDS[sound];
      const source = import.meta.env.BASE_URL + "/sfx/" + soundPath;
      map[sound] = new Audio(source);
    }

    for (const sound in SOUNDS) {
      map[sound as SoundName].load();
    }

    setSoundMap(map);
  }, [soundMap]);

  const playSound = useCallback(
    (soundName: SoundName) => {
      try {
        const audio = soundMap?.[soundName];
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } catch (error) {
        console.warn(`Unable to play sound: ${soundName}`, error);
      }
    },
    [soundMap]
  );

  return { playSound };
}
