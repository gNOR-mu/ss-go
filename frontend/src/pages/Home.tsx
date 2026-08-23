import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

    return (
        <Box p="6">
            <Heading size="xl">{t('home.title')}</Heading>
        </Box>
    )
}