import { HotStreakPrefs } from "@/types/heatIndex";

export const stripWeights = (prefs: HotStreakPrefs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { gamesWindow, playoffOnly, ...weights } = prefs;
  return weights;
};
