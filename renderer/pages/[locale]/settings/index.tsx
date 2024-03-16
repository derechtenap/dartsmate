import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProperties } from '../../../lib/get-static'
import DefaultLayout from '@/components/layouts/Default'
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
import { i18n as _i18n } from '../../.././../next-i18next.config'
import { useRouter } from 'next/router'

const SettingsPage = () => {
  const iconStyles = { height: rem(20), width: rem(20) }
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const {
    t,
    i18n: { language: local }
  } = useTranslation()

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

  const [activeTab, setActiveTab] = useState<string | null>(settingsRoutes[0].tabValue)

  const locals: ComboboxData = _i18n.locales.map((locale) => ({
    label: t(`languages.${locale}`, {
      ns: 'settings'
    }),
    value: locale
  }))

  useEffect(() => {
    window.ipc.setLocale(local)
  }, [local])

  const dataColorSchemes: SegmentedControlProps['data'] = [
    {
      value: 'light',
      label: (
        <Center style={{ gap: 10 }}>
          <IconSun style={iconStyles} />
          <span>
            {t('colorSchemes.light', {
              ns: 'settings'
            })}
          </span>
        </Center>
      )
    },
    {
      value: 'dark',
      label: (
        <Center style={{ gap: 10 }}>
          <IconMoon style={iconStyles} />
          <span>
            {' '}
            {t('colorSchemes.dark', {
              ns: 'settings'
            })}
          </span>
        </Center>
      )
    },
    {
      value: 'auto',
      label: (
        <Center style={{ gap: 10 }}>
          <IconDeviceDesktop style={iconStyles} />
          <span>
            {t('colorSchemes.auto', {
              ns: 'settings'
            })}
          </span>
        </Center>
      )
    }
  ]

  const router = useRouter()

  const handleChangeLanguage = (newLanguage: string) => {
    const newPath = router.pathname.replace('[locale]', newLanguage)
    void router.push(newPath)
  }

  const renderTabs = () => {
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

  const renderColorSchemeTab = () => {
    return (
      <Tabs.Panel value="cs">
        <Stack>
          <Title>
            {t('settings.colorScheme.title', {
              ns: 'settings'
            })}
          </Title>
          <Text mb="lg">
            {t('settings.colorScheme.text', {
              ns: 'settings'
            })}
          </Text>
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

  const renderLanguageTab = () => {
    return (
      <Tabs.Panel value="la">
        <Stack>
          <Title>
            {t('settings.language.title', {
              ns: 'settings'
            })}
          </Title>
          <Text mb="lg">
            {t('settings.language.text', {
              ns: 'settings'
            })}
          </Text>
          <Select
            allowDeselect={false}
            searchable
            label={t('settings.language.title', {
              ns: 'settings'
            })}
            defaultValue={local}
            data={locals}
            onChange={(newLanguage) => handleChangeLanguage(newLanguage as string)}
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

export const getStaticProps = makeStaticProperties(['common', 'settings'])

export { getStaticPaths }
