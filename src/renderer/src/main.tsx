import './assets/base.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import IndexPage from './pages/Index'
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
            <Route Component={SettingsPage} path="/settings" />
            <Route Component={IndexPage} path="*" />
          </Routes>
        </HashRouter>
      </Suspense>
    </MantineProvider>
  </React.StrictMode>
)
