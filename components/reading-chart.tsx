"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock } from "lucide-react";

const generateChartData = () => {
  const data = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    data.push({
      date: dateString,
      pages: Math.floor(Math.random() * 400) + 80,
      books: Math.floor(Math.random() * 400) + 120,
    });
  }
  return data;
};

const chartData = generateChartData();

const chartConfig = {
  pages: { label: "Páginas", color: "var(--color-chart-1)" },
  books: { label: "Livros", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

interface ReadingChartProps {
  isActive?: boolean;
}

export function ReadingChart({ isActive = true }: ReadingChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [timeRange]);

  return (
    <Card
      className={`@container/card transition-all duration-300 ${
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
              Métricas não disponíveis
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Comece a registrar suas leituras para visualizar seu progresso
            </p>
          </div>
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Evolução da leitura</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:inline">
                Total de páginas e livros lidos nos últimos 3 meses
              </span>
              <span className="@[540px]/card:hidden">Últimos 3 meses</span>
            </CardDescription>
            <CardAction>
              <ToggleGroup
                type="single"
                value={timeRange}
                onValueChange={setTimeRange}
                variant="outline"
                className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                aria-label="Selecionar período de tempo"
              >
                <ToggleGroupItem value="90d" aria-label="Últimos 3 meses">
                  Últimos 3 meses
                </ToggleGroupItem>
                <ToggleGroupItem value="30d" aria-label="Últimos 30 dias">
                  Últimos 30 dias
                </ToggleGroupItem>
                <ToggleGroupItem value="7d" aria-label="Últimos 7 dias">
                  Últimos 7 dias
                </ToggleGroupItem>
              </ToggleGroup>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger
                  className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                  size="sm"
                  aria-label="Selecionar período de tempo para o gráfico"
                >
                  <SelectValue placeholder="Últimos 3 meses" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="90d" className="rounded-lg">
                    Últimos 3 meses
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Últimos 30 dias
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Últimos 7 dias
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardAction>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData} accessibilityLayer>
                <defs>
                  <linearGradient id="fillPages" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillBooks" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  aria-label="Data"
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("pt-BR", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="books"
                  type="natural"
                  fill="url(#fillBooks)"
                  stroke="var(--color-chart-2)"
                  stackId="a"
                />
                <Area
                  dataKey="pages"
                  type="natural"
                  fill="url(#fillPages)"
                  stroke="var(--color-chart-1)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </>
      )}
    </Card>
  );
}
