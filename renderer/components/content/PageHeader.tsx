import { Title, Text, Box } from "@mantine/core";

type Props = {
  children: React.ReactNode;
  title: string;
};

const PageHeader = ({ children, title }: Props) => {
  return (
    <Box mb="xl" component="header">
      <Title>{title}</Title>
      <Text>{children}</Text>
    </Box>
  );
};

export default PageHeader;
