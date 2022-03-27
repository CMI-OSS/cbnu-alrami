import { ScenarioStateType } from "@shared/types";

export type ScenarioFilterType = "all" | ScenarioStateType;

export type ScenarioTurnType = "prev" | "current" | "next";

export type ScenarioQueueType = {
  id: number;
  title: string;
  turn: ScenarioTurnType;
};
