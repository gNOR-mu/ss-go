import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Settings from './Settings'
import Sidebar, { NavTab } from './assets/components/Sidebar'
import { Provider } from './components/ui/provider'
import { Box, Flex } from '@chakra-ui/react'

function RootComponent() {
    const [currentTab, setCurrentTab] = useState<NavTab>(NavTab.HOME);

    return (
        <Provider>
            <Flex w="100vw" minH="100vh">
                <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
                <Box flex="1">
                    {currentTab === NavTab.HOME && <App />}
                    {currentTab === NavTab.SETTINGS && <Settings />}
                </Box>
            </Flex>
        </Provider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <RootComponent />
    </React.StrictMode>
)
