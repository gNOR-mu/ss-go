import { HStack, Text, VStack } from "@chakra-ui/react";

interface InfoRowProps {
    label: string;
    value?: string | null;
}

export default function InfoRow({ label, value }: InfoRowProps) {
    return (
        <HStack justify="space-between" w="100%" py="1">
            <Text color="gray.400">{label}</Text>
            <Text fontWeight="semibold">{value || "---"}</Text>
        </HStack>
    );
}