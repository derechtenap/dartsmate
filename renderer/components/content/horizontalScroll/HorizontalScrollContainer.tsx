import type { PropsWithChildren } from "react";
import {
  Flex,
  type MantineSpacing,
  ScrollArea,
  type ScrollAreaProps,
} from "@mantine/core";

type HorizontalScrollContainerProps = ScrollAreaProps &
  PropsWithChildren & {
    gap?: MantineSpacing;
  };

const HorizontalScrollContainer = ({
  children,
  gap,
  ...props
}: HorizontalScrollContainerProps) => {
  return (
    <ScrollArea
      scrollbars={props.scrollbars ?? "x"}
      offsetScrollbars={props.offsetScrollbars ?? "x"}
      scrollbarSize={props.scrollbarSize ?? 6}
      type={props.type ?? "hover"}
      {...props}
    >
      <Flex gap={gap ?? "lg"}>{children}</Flex>
    </ScrollArea>
  );
};

export default HorizontalScrollContainer;
