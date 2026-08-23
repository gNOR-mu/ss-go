import { Box, Icon, Spacer, Tabs } from "@chakra-ui/react";
import Settings from "@/pages/Settings";
import { VscHome, VscSettings, VscSettingsGear } from "react-icons/vsc";
import Home from "@/pages/Home";
import { Tooltip } from "./tooltip";
import { IconType } from "react-icons";

const TABS = {
    HOME: 'home',
    SETTINGS: 'settings'
}
/**
 * Propiedades para el componente NavIconButton.
 * @property value Identificador único del tab asociado a este botón.
 * @property label Texto descriptivo mostrado dentro del Tooltip al pasar el cursor.
 * @property icon Ícono de react-icons a renderizar dentro del botón.
 */
interface NavIconButtonProps {
    value: string;
    label: string;
    icon: IconType;
}

/**
 * Botón interactivo reutilizable para la barra de navegación lateral.
 * Renderiza un ícono envuelto en un Tabs.Trigger estilizado con Tooltip explicativo.
 * 
 * @param props Propiedades del botón (value, label, icon).
 * @return Componente de gatillo de tab estilizado.
 */
function NavIconButton({ value, label, icon }: NavIconButtonProps) {
    return (
        <Tooltip content={label} showArrow positioning={{ placement: "right" }}>
            <Tabs.Trigger
                value={value}
                w="44px"
                h="44px"
                justifyContent="center"
                borderRadius="xl"
                transition="all 0.3s ease"
                _selected={{
                    bg: "blue.600",
                    color: "white",
                }}
            >
                <Icon as={icon} boxSize="22px" />
            </Tabs.Trigger>
        </Tooltip>
    )
}

/**
 * Barra de navegación que contiene las distintas páginas principales para la navegación.
 * @returns Componente Tabs con las principales páginas de navegación.
 */
export default function TabNav() {
    return (
        <Tabs.Root defaultValue={TABS.HOME} orientation="vertical" h="100vh" lazyMount variant="plain">
            {/* Barra lateral */}
            <Tabs.List p="2" gap="2" borderRight="1px solid" borderColor="whiteAlpha.100">
                <NavIconButton value={TABS.HOME} label="Inicio" icon={VscHome} />
                <Spacer />
                <NavIconButton value={TABS.SETTINGS} label="Ajustes" icon={VscSettingsGear} />

            </Tabs.List>

            {/* Contenido */}
            <Box flex="1">
                <Tabs.Content value={TABS.HOME} h="100%"><Home /></Tabs.Content>
                <Tabs.Content value={TABS.SETTINGS} h="100%"><Settings /></Tabs.Content>
            </Box>
        </Tabs.Root>
    )
}