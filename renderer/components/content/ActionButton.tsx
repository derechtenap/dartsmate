import type { ActionIconProps } from "@mantine/core";
import { ActionIcon, Tooltip } from "@mantine/core";

interface ActionButtonProps extends ActionIconProps {
  action: () => void;
  icon: JSX.Element;
  label: string;
}

const ActionButton = ({ action, icon, label, ...rest }: ActionButtonProps) => {
  return (
    <Tooltip label={label} withArrow>
      <ActionIcon {...rest} onClick={() => action()}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default ActionButton;
