import { Player } from "@/entities/team/@x/player";

type Team = {
  name: string;
  players: Player[];
  points: number;
  place: number;
  totalKills: number;
};

export type { Team };
