import './assets/base.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import IndexPage from './pages/Index'
import PracticePage from './pages/Practice'
import LobbyPage from './pages/Lobby'
import HistoryPage from './pages/History'
import ProfilePage from './pages/Profile'
import StatisticsPage from './pages/Statistics'
import SettingsPage from './pages/Settings'

import { Center, Loader, MantineProvider } from '@mantine/core'

import './utils/i18n'

// Add the styles for each package except the `hooks` package.
import '@mantine/core/styles.css'

// A fallback loader while the main content is being loaded.
const loader = (
  <Center h="100vh">
    <Loader />
  </Center>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="auto"
      theme={{
        primaryColor: 'red'
      }}
    >
      <Suspense fallback={loader}>
        <HashRouter>
          <Routes>
            <Route Component={IndexPage} index path="/" />
            <Route Component={LobbyPage} path="/lobby" />
            <Route Component={PracticePage} path="/practice" />
            <Route Component={HistoryPage} path="/history" />
            <Route Component={ProfilePage} path="/profile" />
            <Route Component={StatisticsPage} path="/statistics" />
            <Route Component={SettingsPage} path="/settings" />
            <Route Component={IndexPage} path="*" />
          </Routes>
        </HashRouter>
      </Suspense>
    </MantineProvider>
  </React.StrictMode>
)
