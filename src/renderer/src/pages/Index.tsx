import { Button, Group } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import DefaultLayout from '../components/layouts/Default'

function IndexPage(): JSX.Element {
  const { t, i18n } = useTranslation()

  const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  }

  return (
    <DefaultLayout withNavbarOpen>
      <Group>
        {t('yes')} , locale = {i18n.language}
        {Object.keys(lngs).map((lng) => (
          <Button key={lng} onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
          </Button>
        ))}
      </Group>
    </DefaultLayout>
  )
}

export default IndexPage
