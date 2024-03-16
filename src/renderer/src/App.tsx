import { Button, Group } from '@mantine/core'
import { useTranslation } from 'react-i18next'

function App(): JSX.Element {
  const { t, i18n } = useTranslation()

  const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  }

  return (
    <Group>
      {t('yes')} , locale = {i18n.language}
      {Object.keys(lngs).map((lng) => (
        <Button key={lng} onClick={() => i18n.changeLanguage(lng)}>
          {lngs[lng].nativeName}
        </Button>
      ))}
    </Group>
  )
}

export default App
