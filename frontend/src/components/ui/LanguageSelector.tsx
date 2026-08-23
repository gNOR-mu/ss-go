import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LANGUAGES: Record<string, string> = {
    es: "Español",
    en: "English"
}

/**
 * Componente para la selección de idiomas 
 */
export default function LanguageSelector() {
    const { t, i18n } = useTranslation();

    const availableLanguages = Object.keys(LANGUAGES);

    return (
        <VStack align="start" gap="6">
            <Heading size="xl">{t('settings.title')}</Heading>
            <Box>
                <Text fontWeight="medium" mb="2">{t('settings.language')}:</Text>
                <HStack gap="3">
                    {availableLanguages.map((lang) => (
                        <Button
                            key={lang}
                            variant={i18n.language === lang ? "solid" : "outline"}
                            colorPalette="blue"
                            size="sm"
                            onClick={() => i18n.changeLanguage(lang)}
                        >
                            {LANGUAGES[lang]}
                        </Button>
                    ))}
                </HStack>
            </Box>
        </VStack>
    )
}