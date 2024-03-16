import './assets/base.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { MantineProvider } from '@mantine/core'

import './utils/i18n'

// Add the  styles for each package
import '@mantine/core/styles.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <MantineProvider
        defaultColorScheme="auto"
        theme={{
          primaryColor: 'red'
        }}
      >
        <App />
      </MantineProvider>
    </Suspense>
  </React.StrictMode>
)
