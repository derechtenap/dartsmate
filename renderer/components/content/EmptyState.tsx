import { Group, Paper, Title, Text } from "@mantine/core";
import { IconAlertHexagonFilled } from "@tabler/icons-react";

type EmptyStateProps = {
  title?: string;
  text?: string;
};

/**
 *
 * Represents an empty state dialog.
 * This component is designed to be used when there is no data to display,
 * providing a visually appealing and informative message.
 *
 * @component
 * @example
 * <EmptyState
 *   title="Custom Title"
 *   text="Custom description text goes here."
 * />
 *
 * @param {Object} props - The properties of the EmptyState component.
 * @param {string} [props.title] - The title to be displayed in the empty state dialog.
 * Defaults to a generic message.
 * @param {string} [props.text] - The description text to be displayed in the empty state dialog.
 * Defaults to a generic message.
 *
 * @returns {JSX.Element} JSX.Element with an empty state dialog.
 *
 */
const EmptyState = ({ title, text }: EmptyStateProps): JSX.Element => {
  return (
    <Group h="100%" position="center">
      <Paper withBorder p="lg" maw={650}>
        <IconAlertHexagonFilled
          size="4rem"
          style={{
            opacity: 0.8,
          }}
        />
        <Title my="lg">
          {title ||
            "Oops! It seems like there's no data to display at the moment."}
        </Title>
        <Text fz="lg">
          {text ||
            "Feel free to check back later. If the issue persists, please contact support for assistance."}
        </Text>
      </Paper>
    </Group>
  );
};

export default EmptyState;
