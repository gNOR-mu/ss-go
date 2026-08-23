import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'
import TabNav from './components/ui/TabNav'

function RootComponent() {
    return (
        <Provider>
            <TabNav />
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
