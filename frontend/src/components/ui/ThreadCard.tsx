import { Card, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ThreadCardProps {
    index: number;
    usage: number;
    palette: string;
}

export default function ThreadCard({ index, usage, palette }: ThreadCardProps) {
    const { t } = useTranslation();

    return (
        <Card.Root
            p="3"
            borderRadius="md"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.100"
            transition="all 0.2s ease"
            _hover={{ borderColor: "colorPalette.500" }}
        >
            <VStack align="stretch" gap="2">
                <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.400">
                        {t('metrics.thread')} {index + 1}
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color={`${palette}.400`}>
                        {usage.toFixed(1)}%
                    </Text>
                </HStack>
                <Progress.Root value={usage} size="xs" colorPalette={palette} borderRadius="full">
                    <Progress.Track>
                        <Progress.Range />
                    </Progress.Track>
                </Progress.Root>
            </VStack>
        </Card.Root>
    );
}
