export type DifficultyLevel = "Iniciante" | "Intermediário" | "Avançado";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeColor: string;
  difficulty: DifficultyLevel;
  difficultyIcon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  animation?: "pulse" | "glow";
};
