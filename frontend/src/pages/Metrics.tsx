import CpuChart, { HistoryPoint } from "@/components/ui/CpuChart";
import ThreadCard from "@/components/ui/ThreadCard";
import { Box, Button, Card, Heading, HStack, Progress, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { GetCpuCoresUsage, GetCpuUsage } from "@wails/go/main/App";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const INTERVAL_OPTIONS = [
    { label: "1s", value: 1 },
    { label: "5s", value: 5 },
    { label: "10s", value: 10 },
    { label: "30s", value: 30 },
    { label: "60s", value: 60 },
];

const RANGE_OPTIONS = [
    { label: "30s", value: 30 },
    { label: "1 min", value: 60 },
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
];

const THREAD_COLORS = [
    "#3182ce", "#38a169", "#d69e2e", "#e53e3e", "#805ad5", "#d53f8c",
    "#00b5d8", "#dd6b20", "#319795", "#667eea", "#ed64a6", "#9f7aea",
    "#4fd1c5", "#f6e05e", "#fc8181", "#b794f4"
];

export default function Metrics() {
    const { t } = useTranslation();
    const [totalCpu, setTotalCpu] = useState<number>(0);
    const [coresUsage, setCoresUsage] = useState<number[]>([]);
    const [history, setHistory] = useState<HistoryPoint[]>([]);

    // Configuración de vista y tiempo
    const [viewMode, setViewMode] = useState<"cpu" | "threads">("cpu");
    const [refreshInterval, setRefreshInterval] = useState<number>(1);
    const [timeRange, setTimeRange] = useState<number>(30);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const [usage, cores] = await Promise.all([GetCpuUsage(), GetCpuCoresUsage()]);
                const roundedUsage = Math.round(usage * 10) / 10;
                setTotalCpu(roundedUsage);
                setCoresUsage(cores);

                const maxPoints = Math.max(5, Math.floor(timeRange / refreshInterval));
                const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                const newPoint: HistoryPoint = { time: nextTime, usage: roundedUsage };
                cores.forEach((c, idx) => {
                    newPoint[`thread_${idx}`] = Math.round(c * 10) / 10;
                });

                setHistory((prev) => [...prev, newPoint].slice(-maxPoints));
            } catch (err) {
                console.error("Error al obtener métricas:", err);
            }
        };

        fetchMetrics();
        const intervalId = setInterval(fetchMetrics, refreshInterval * 1000);

        return () => clearInterval(intervalId);
    }, [refreshInterval, timeRange]);

    const getColorPalette = (val: number) => {
        if (val > 80) return "red";
        if (val > 50) return "yellow";
        return "green";
    };

    return (
        <Box p="6" h="100%" overflowY="auto">
            <Heading size="xl" mb="4">{t('metrics.title')}</Heading>

            <VStack align="stretch" gap="6">
                {/* Tarjeta Principal con Gráfica y Controles */}
                <Card.Root p="4" borderRadius="lg" bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100">
                    <Card.Body gap="3">
                        <HStack justify="space-between" flexWrap="wrap" gap="3">
                            <VStack align="start" gap="0">
                                <Text fontSize="lg" fontWeight="semibold">
                                    {viewMode === "cpu" ? t('metrics.cpu_total') : t('metrics.threads_usage')}
                                </Text>
                                <Text fontSize="xs" color="gray.400">
                                    {t('metrics.interval')}: {refreshInterval}s | {t('metrics.range')}: {timeRange >= 60 ? `${timeRange / 60}m` : `${timeRange}s`}
                                </Text>
                            </VStack>
                            <Text fontSize="2xl" fontWeight="bold" color={`${getColorPalette(totalCpu)}.400`}>
                                {totalCpu.toFixed(1)}%
                            </Text>
                        </HStack>

                        {/* Barra de controles */}
                        <HStack justify="space-between" flexWrap="wrap" gap="4" py="2" borderY="1px solid" borderColor="whiteAlpha.100">
                            {/* Selector modo de vista */}
                            <HStack gap="2">
                                <Text fontSize="xs" color="gray.400" fontWeight="medium">{t('metrics.view_mode')}:</Text>
                                <HStack gap="1">
                                    <Button
                                        size="xs"
                                        variant={viewMode === "cpu" ? "solid" : "outline"}
                                        colorPalette={viewMode === "cpu" ? "blue" : "gray"}
                                        onClick={() => setViewMode("cpu")}
                                    >
                                        {t('metrics.view_cpu')}
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant={viewMode === "threads" ? "solid" : "outline"}
                                        colorPalette={viewMode === "threads" ? "blue" : "gray"}
                                        onClick={() => setViewMode("threads")}
                                    >
                                        {t('metrics.view_threads')}
                                    </Button>
                                </HStack>
                            </HStack>

                            {/* Selector de intervalo */}
                            <HStack gap="2">
                                <Text fontSize="xs" color="gray.400" fontWeight="medium">{t('metrics.interval')}:</Text>
                                <HStack gap="1">
                                    {INTERVAL_OPTIONS.map((opt) => (
                                        <Button
                                            key={opt.value}
                                            size="xs"
                                            variant={refreshInterval === opt.value ? "solid" : "outline"}
                                            colorPalette={refreshInterval === opt.value ? "blue" : "gray"}
                                            onClick={() => setRefreshInterval(opt.value)}
                                        >
                                            {opt.label}
                                        </Button>
                                    ))}
                                </HStack>
                            </HStack>

                            {/* Selector de rango de historial */}
                            <HStack gap="2">
                                <Text fontSize="xs" color="gray.400" fontWeight="medium">{t('metrics.range')}:</Text>
                                <HStack gap="1">
                                    {RANGE_OPTIONS.map((opt) => (
                                        <Button
                                            key={opt.value}
                                            size="xs"
                                            variant={timeRange === opt.value ? "solid" : "outline"}
                                            colorPalette={timeRange === opt.value ? "blue" : "gray"}
                                            onClick={() => setTimeRange(opt.value)}
                                        >
                                            {opt.label}
                                        </Button>
                                    ))}
                                </HStack>
                            </HStack>
                        </HStack>

                        <Progress.Root value={totalCpu} size="xs" colorPalette={getColorPalette(totalCpu)} borderRadius="full" mt="1">
                            <Progress.Track>
                                <Progress.Range />
                            </Progress.Track>
                        </Progress.Root>

                        <CpuChart
                            viewMode={viewMode}
                            history={history}
                            coresCount={coresUsage.length}
                            threadColors={THREAD_COLORS}
                        />
                    </Card.Body>
                </Card.Root>

                <Box>
                    <Heading size="md" mb="3">{t('metrics.threads_usage')}</Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="3">
                        {coresUsage.map((usage, index) => (
                            <ThreadCard
                                key={index}
                                index={index}
                                usage={usage}
                                palette={getColorPalette(usage)}
                            />
                        ))}
                    </SimpleGrid>
                </Box>
            </VStack>
        </Box>
    );
}