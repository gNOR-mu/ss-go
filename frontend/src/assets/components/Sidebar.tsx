import { IconButton, Link, Spacer, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "../../components/ui/color-mode";
import { VscHome, VscSettingsGear } from "react-icons/vsc";
import { Tooltip } from "@/components/ui/tooltip";

export enum NavTab {
    HOME,
    SETTINGS
}

interface SidebarButtonProps {
    tooltip: string;
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

function SidebarButton({ tooltip, isActive, onClick, children }: SidebarButtonProps) {
    return (
        <Tooltip content={tooltip} showArrow openDelay={700} >
            <IconButton
                variant="ghost"
                w="32px"
                h="32px"
                borderRadius={0}
                onClick={onClick}
                bg={isActive ? "secondary" : undefined}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

interface SidebarProps {
    currentTab: NavTab;
    onTabChange: (tab: NavTab) => void;
}

function Sidebar({ currentTab, onTabChange }: SidebarProps) {
    return (
        <VStack h="100vh" bgColor="primary" gap="3">
            <SidebarButton tooltip="Ir a inicio"
                isActive={currentTab === NavTab.HOME}
                onClick={() => onTabChange(NavTab.HOME)}>
                <VscHome />
            </SidebarButton>

            <Spacer />

            <SidebarButton tooltip="Ir a ajustes"
                isActive={currentTab === NavTab.SETTINGS}
                onClick={() => onTabChange(NavTab.SETTINGS)}>
                <VscSettingsGear />
            </SidebarButton>
        </VStack >
    )

}

export default Sidebar;