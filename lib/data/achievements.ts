import type { Achievement } from "@/app/types/achievement";

export const achievementsData: Achievement[] = [
  {
    id: "first-page",
    title: "Primeira Página Virada",
    description:
      "Você iniciou sua jornada literária! Cada grande leitor começa com o primeiro passo.",
    icon: "📖",
    badgeColor: "bg-emerald-200 text-emerald-800",
    difficulty: "Iniciante",
    difficultyIcon: "🌱",
    unlocked: true,
    unlockedAt: new Date("2024-01-15"),
  },
  {
    id: "five-minutes",
    title: "Cinco Minutinhos",
    description:
      "Você leu por pelo menos 5 minutos em um dia! Até os minutinhos contam e cada página é progresso.",
    icon: "⏱️",
    badgeColor: "bg-yellow-200 text-yellow-800",
    difficulty: "Iniciante",
    difficultyIcon: "🌱",
    unlocked: true,
    unlockedAt: new Date("2024-01-16"),
  },
  {
    id: "mini-streak",
    title: "Mini-Streak",
    description:
      "Você leu em 3 dias seguidos, mesmo que só por alguns minutos. Persistência pequena, mas consistente.",
    icon: "🔥",
    badgeColor: "bg-orange-200 text-orange-800",
    difficulty: "Intermediário",
    difficultyIcon: "💪",
    unlocked: true,
    unlockedAt: new Date("2024-01-18"),
    animation: "pulse",
  },
  {
    id: "breathing-time",
    title: "Hora de Respirar",
    description:
      "Você leu em um momento de pausa ou descanso (como antes de dormir ou intervalo no trabalho). Dedicação à leitura, mesmo em horários curtos.",
    icon: "🌙",
    badgeColor: "bg-indigo-200 text-indigo-800",
    difficulty: "Avançado",
    difficultyIcon: "🌕",
    unlocked: false,
    animation: "glow",
  },
  {
    id: "escape-routine",
    title: "Fuga da Rotina",
    description:
      "Você usou a leitura como uma pausa ativa no seu dia. Em um mundo de demandas infinitas, você escolheu se presentear com algumas páginas.",
    icon: "🪟",
    badgeColor: "bg-blue-200 text-blue-800",
    difficulty: "Intermediário",
    difficultyIcon: "💪",
    unlocked: true,
    unlockedAt: new Date("2024-01-20"),
    animation: "pulse",
  },
  {
    id: "realistic-goal",
    title: "Meta Realista",
    description:
      "Você atingiu uma meta de leitura personalizada e alcançável! Celebramos progresso, não perfeição.",
    icon: "🎯",
    badgeColor: "bg-purple-200 text-purple-800",
    difficulty: "Avançado",
    difficultyIcon: "🌕",
    unlocked: true,
    unlockedAt: new Date("2024-01-22"),
    animation: "glow",
  },
  {
    id: "weekend-reader",
    title: "Leitor de Fim de Semana",
    description:
      'Você manteve viva a chama da leitura mesmo nos dias de descanso, quando a tentação é só "desligar".',
    icon: "☕",
    badgeColor: "bg-amber-200 text-amber-800",
    difficulty: "Iniciante",
    difficultyIcon: "🌱",
    unlocked: false,
  },
  {
    id: "fresh-start",
    title: "Recomeço",
    description:
      "Você voltou aos livros após uma pausa. A vida às vezes atrapalha, mas o importante é sempre retomar.",
    icon: "🔄",
    badgeColor: "bg-green-200 text-green-800",
    difficulty: "Intermediário",
    difficultyIcon: "💪",
    unlocked: false,
    animation: "pulse",
  },
];

export function getAchievements() {
  return achievementsData;
}

export function getUnlockedAchievements() {
  return achievementsData.filter((achievement) => achievement.unlocked);
}

export function getLockedAchievements() {
  return achievementsData.filter((achievement) => !achievement.unlocked);
}
