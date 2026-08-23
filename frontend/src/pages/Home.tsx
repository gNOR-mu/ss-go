import SectionItem from "@/components/ui/SectionItem";
import { Accordion, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { GetSystemInfo } from "@wails/go/main/App";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface SystemInfo {
    user: string;
    hostname: string;
    os: string;
    arch: string;
}

export default function Home() {
    const { t } = useTranslation();

    const [info, setInfo] = useState<SystemInfo | null>(null);

    useEffect(() => {
        GetSystemInfo().then((data) => {
            setInfo(data);
            console.log("info cargada")
        }).catch(console.error);
    }, []);

    return (
        <Box p="6">
            <Heading size="xl">{t('home.title')}</Heading>
            <Accordion.Root collapsible defaultValue={["general"]} my={3} variant="subtle">
                <SectionItem value="general" title={t('home.general_info')}>
                    <VStack align="start" gap="1">
                        <Text><strong>{t('home.user_host')}:</strong> {info ? `${info.user}@${info.hostname}` : t('home.loading')}</Text>
                        <Text><strong>{t('home.os')}:</strong> {info?.os || t('home.loading')}</Text>
                        <Text><strong>{t('home.architecture')}:</strong> {info?.arch || t('home.loading')}</Text>
                    </VStack>
                </SectionItem>
                {/* <SectionItem value="processor" title={t('home.processor_and_graphics')} /> */}
                {/* <SectionItem value="memory" title={t('home.memory_and_storage')} /> */}
            </Accordion.Root>
        </Box>

    )
}