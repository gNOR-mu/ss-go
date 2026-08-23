import InfoRow from "@/components/ui/InfoRow";
import SectionItem from "@/components/ui/SectionItem";
import { Accordion, Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { GetSystemInfo } from "@wails/go/main/App";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { VscRocket } from "react-icons/vsc";

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
                <SectionItem icon={VscRocket} value="general" title={t('home.general_info')}>
                    <VStack align="stretch" w="100%">
                        <InfoRow label={t('home.user_host')} value={info ? `${info.user}@${info.hostname}` : t('home.loading')} />
                        <InfoRow label={t('home.os')} value={info?.os} />
                        <InfoRow label={t('home.architecture')} value={info?.arch} />
                    </VStack>
                </SectionItem>
                {/* <SectionItem value="processor" title={t('home.processor_and_graphics')} /> */}
                {/* <SectionItem value="memory" title={t('home.memory_and_storage')} /> */}
            </Accordion.Root>
        </Box>

    )
}