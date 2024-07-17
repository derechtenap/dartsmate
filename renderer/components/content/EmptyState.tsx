import { Paper, Title, Text, Stack } from "@mantine/core";
import type { PaperProps } from "@mantine/core";
import { useTranslation } from "next-i18next";

type EmptyStateProps = {
  children?: React.ReactNode;
  icon: JSX.Element;
  title?: string;
  text?: string;
} & PaperProps;

const EmptyState = ({
  icon,
  title,
  text,
  ...rest
}: EmptyStateProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper component={Stack} {...rest} withBorder p="lg">
      {icon}
      <Title>{title || t("defaultEmptyState.title")}</Title>
      <Text>{text || t("defaultEmptyState.text")}</Text>
    </Paper>
  );
};

export default EmptyState;
