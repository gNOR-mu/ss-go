import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface HistoryPoint {
    time: string;
    usage: number;
    [key: string]: string | number;
}

interface CpuChartProps {
    viewMode: "cpu" | "threads";
    history: HistoryPoint[];
    coresCount: number;
    threadColors: string[];
}

export default function CpuChart({ viewMode, history, coresCount, threadColors }: CpuChartProps) {
    const { t } = useTranslation();

    return (
        <Box h="220px" w="100%" mt="2">
            <ResponsiveContainer width="100%" height="100%">
                {viewMode === "cpu" ? (
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3182ce" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3182ce" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a0aec0" }} stroke="#4a5568" />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#a0aec0" }} stroke="#4a5568" unit="%" width={40} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1a202c", borderColor: "#2d3748", borderRadius: "8px" }}
                            labelStyle={{ color: "#a0aec0" }}
                            itemStyle={{ color: "#63b3ed" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="usage"
                            stroke="#3182ce"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#cpuGradient)"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                ) : (
                    <LineChart data={history} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a0aec0" }} stroke="#4a5568" />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#a0aec0" }} stroke="#4a5568" unit="%" width={40} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1a202c", borderColor: "#2d3748", borderRadius: "8px" }}
                            labelStyle={{ color: "#a0aec0" }}
                        />
                        {Array.from({ length: coresCount }).map((_, idx) => (
                            <Line
                                key={idx}
                                type="monotone"
                                dataKey={`thread_${idx}`}
                                name={`${t('metrics.thread')} ${idx + 1}`}
                                stroke={threadColors[idx % threadColors.length]}
                                strokeWidth={1.5}
                                dot={false}
                                isAnimationActive={false}
                            />
                        ))}
                    </LineChart>
                )}
            </ResponsiveContainer>
        </Box>
    );
}
