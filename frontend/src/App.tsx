import { useState } from 'react';
import { Greet } from "../wailsjs/go/main/App";
import { ColorModeButton } from './components/ui/color-mode';
import { Box, Heading } from '@chakra-ui/react';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <Box p="6">
            <Heading size="xl">Hola mundillo, perfectirijillo</Heading>
        </Box>)
}

export default App
