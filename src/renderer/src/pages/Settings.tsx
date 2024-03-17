import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { locales } from '@renderer/utils/i18n'
import DefaultLayout from '../components/layouts/Default'

import {
  Grid,
  NavLink,
  Tabs,
  Title,
  Text,
  rem,
  Stack,
  SegmentedControl,
  Center,
  useMantineColorScheme,
  MantineColorScheme,
  SegmentedControlProps,
  Select,
  ComboboxData
} from '@mantine/core'
import {
  IconDeviceDesktop,
  IconLanguage,
  IconMoon,
  IconPalette,
  IconSun
} from '@tabler/icons-react'

const SettingsPage = (): JSX.Element => {
  const iconStyles = { height: rem(20), width: rem(20) }
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const {
    t,
    i18n: { language: local }
  } = useTranslation(['settings'])

  const settingsRoutes = [
    {
      label: t('settings.colorScheme.title', {
        ns: 'settings'
      }),
      tabValue: 'cs',
      icon: <IconPalette style={iconStyles} />
    },
    {
      label: t('settings.language.title', {
        ns: 'settings'
      }),
      tabValue: 'la',
      icon: <IconLanguage style={iconStyles} />
    }
  ]

  const [activeTab, setActiveTab] = useState<string>(settingsRoutes[0].tabValue)

  const locals: ComboboxData = locales.map((locale) => ({
    label: t(`languages.${locale}`, {
      ns: 'settings'
    }),
    value: locale
  }))

  const handleChangeLanguage = (newLanguage: string | null): void => {
    /*
     * Only update the language when it's a valid string
     * and if it's different from the currently used language.
     */
    if (!newLanguage || newLanguage === i18n.language) return

    i18n.changeLanguage(newLanguage)
  }

  const dataColorSchemes: SegmentedControlProps['data'] = [
    {
      value: 'light',
      label: (
        <Center style={{ gap: 10 }}>
          <IconSun style={iconStyles} />
          <span>{t('colorSchemes.light')}</span>
        </Center>
      )
    },
    {
      value: 'dark',
      label: (
        <Center style={{ gap: 10 }}>
          <IconMoon style={iconStyles} />
          <span>{t('colorSchemes.dark')}</span>
        </Center>
      )
    },
    {
      value: 'auto',
      label: (
        <Center style={{ gap: 10 }}>
          <IconDeviceDesktop style={iconStyles} />
          <span>{t('colorSchemes.auto')}</span>
        </Center>
      )
    }
  ]

  const renderTabs = (): JSX.Element => {
    return (
      <Grid.Col span={4}>
        {settingsRoutes.map((route) => (
          <NavLink
            active={activeTab === route.tabValue}
            key={route.label}
            leftSection={route.icon}
            label={route.label}
            onClick={() => setActiveTab(route.tabValue)}
            variant="filled"
          />
        ))}
      </Grid.Col>
    )
  }

  const renderColorSchemeTab = (): JSX.Element => {
    return (
      <Tabs.Panel value="cs">
        <Stack>
          <Title>{t('settings.colorScheme.title')}</Title>
          <Text mb="lg">{t('settings.colorScheme.text')}</Text>
          <SegmentedControl
            color="red"
            onChange={(newScheme) => setColorScheme(newScheme as MantineColorScheme)}
            data={dataColorSchemes}
            defaultValue={colorScheme}
            withItemsBorders={false}
          />
        </Stack>
      </Tabs.Panel>
    )
  }

  const renderLanguageTab = (): JSX.Element => {
    return (
      <Tabs.Panel value="la">
        <Stack>
          <Title>{t('settings.language.title')}</Title>
          <Text mb="lg">{t('settings.language.text')}</Text>
          <Select
            allowDeselect={false}
            searchable
            label={t('settings.language.title')}
            defaultValue={local}
            data={locals}
            onChange={(newLanguage) => handleChangeLanguage(newLanguage)}
          />
        </Stack>
      </Tabs.Panel>
    )
  }

  return (
    <DefaultLayout withNavbarOpen>
      <Grid>
        {renderTabs()}
        <Grid.Col span="auto">
          <Tabs value={activeTab}>
            {renderColorSchemeTab()}
            {renderLanguageTab()}
          </Tabs>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  )
}

export default SettingsPage
