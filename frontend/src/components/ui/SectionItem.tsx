import { Accordion, Box, Span, Text } from "@chakra-ui/react";
import React from "react";

interface SectionProps {
    value: string;
    title: string;
    children?: React.ReactNode;
}

export default function SectionItem({ value, title, children }: SectionProps) {
    return (
        <Accordion.Item key={value} value={value}>
            <Accordion.ItemTrigger>
                <Span flex="1">{title}</Span>
                <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
                <Accordion.ItemBody>{children}</Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    )
}