import { Team } from "@/entities/match/@x/team";

enum EMatchStatus {
  Scheduled = "Scheduled",
  Ongoing = "Ongoing",
  Finished = "Finished",
}

type Match = {
  time: string;
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: EMatchStatus;
};

export { EMatchStatus };
export type { Match };
