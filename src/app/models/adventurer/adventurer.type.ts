export interface Adventurer {
  id: number;
  name: string;
  classes: string[];
  level: number;
}

export interface AdventurerStats {
  health: number;
  defences: {
    deflection: number;
    fortitude: number;
    reflex: number;
    will: number;
  };
}
