"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, Target } from "lucide-react";

const goals = [
  {
    title: "Meta Anual",
    current: 8,
    target: 24,
    unit: "livros",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Meta Mensal",
    current: 2,
    target: 2,
    unit: "livros",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    title: "Páginas/Dia",
    current: 73,
    target: 50,
    unit: "páginas",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

interface ReadingGoalsProps {
  isActive?: boolean;
}

export function ReadingGoals({ isActive = true }: ReadingGoalsProps) {
  return (
    <Card
      className={`glass-effect transition-all duration-300 ${
        !isActive ? "opacity-60 grayscale pointer-events-none select-none" : ""
      }`}
    >
      {!isActive ? (
        <div className="flex flex-col items-center justify-center h-[400px] p-6 text-center space-y-4">
          <div className="rounded-full bg-muted/50 p-4">
            <Lock className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Metas não disponíveis
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Configure suas metas de leitura para acompanhar seu progresso
            </p>
          </div>
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Metas de Leitura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {goals.map((goal, index) => {
              const progress = Math.min(
                (goal.current / goal.target) * 100,
                100
              );
              const isCompleted = goal.current >= goal.target;

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal.title}</span>
                    {isCompleted && (
                      <Badge
                        variant="secondary"
                        className="text-green-400 bg-green-400/10"
                      >
                        Concluída!
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {goal.current} {goal.unit}
                      </span>
                      <span>
                        {goal.target} {goal.unit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </>
      )}
    </Card>
  );
}
