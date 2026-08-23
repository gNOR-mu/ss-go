import InfoRow from "@/components/ui/InfoRow";
import SectionItem from "@/components/ui/SectionItem";
import { Accordion, Box, Heading, VStack } from "@chakra-ui/react";
import { GetSystemInfo } from "@wails/go/main/App";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { VscChip, VscRocket } from "react-icons/vsc";

interface SystemInfo {
    user: string;
    hostname: string;
    os: string;
    arch: string;
    cpuModel: string;
    cpuVendor: string;
    cpuCoresLogical: number;
    cpuCoresPhysical: number;
    cpuMhz: number;
    cpuCache: number;
    gpus: string[];
}

export default function Home() {
    const { t } = useTranslation();

    const [info, setInfo] = useState<SystemInfo | null>(null);

    useEffect(() => {
        GetSystemInfo().then((data) => {
            setInfo(data);
        }).catch(console.error);
    }, []);

    return (
        <Box p="6">
            <Heading size="xl">{t('home.title')}</Heading>
            <Accordion.Root multiple defaultValue={["general", "processor"]} my={3} variant="subtle">
                <SectionItem icon={VscRocket} value="general" title={t('home.general_info')}>
                    <VStack align="stretch" w="100%">
                        <InfoRow label={t('home.user_host')} value={info ? `${info.user}@${info.hostname}` : t('home.loading')} />
                        <InfoRow label={t('home.os')} value={info?.os} />
                        <InfoRow label={t('home.architecture')} value={info?.arch} />
                    </VStack>
                </SectionItem>

                <SectionItem icon={VscChip} value="processor" title={t("home.processor_and_graphics")}>
                    <VStack align="stretch" w="100%">
                        <InfoRow label={t('home.processor')} value={info?.cpuModel} />
                        <InfoRow label={t('home.vendor')} value={info?.cpuVendor} />
                        <InfoRow label={t('home.cores')} value={info ? `${info.cpuCoresPhysical} / ${info.cpuCoresLogical}` : null} />
                        <InfoRow label={t('home.clock_speed')} value={info?.cpuMhz ? `${info.cpuMhz.toFixed(0)} MHz` : null} />
                        <InfoRow label={t('home.cache')} value={info?.cpuCache ? `${(info.cpuCache / 1024).toFixed(1)} MB` : null} />

                        {info?.gpus && info.gpus.map((gpuName, index) => (
                            <InfoRow key={index} label={info.gpus.length > 1 ? `${t('home.gpu')} ${index + 1}` : t('home.gpu')} value={gpuName} />
                        ))}
                    </VStack>
                </SectionItem>
            </Accordion.Root>
        </Box>
    );
}