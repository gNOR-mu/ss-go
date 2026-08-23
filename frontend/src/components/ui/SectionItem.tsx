import { Accordion, Box, HStack, Icon, Span, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface SectionProps {
    value: string;
    title: string;
    icon: IconType;
    children?: React.ReactNode;
}

export default function SectionItem({ value, title, icon, children }: SectionProps) {
    return (
        <Accordion.Item key={value} value={value}>
            <Accordion.ItemTrigger>
                <Span flex="1">
                    <HStack>
                        <Icon as={icon} boxSize="22px" />
                        {title}
                    </HStack>
                </Span>
                <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
                <Accordion.ItemBody>{children}</Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    )
}