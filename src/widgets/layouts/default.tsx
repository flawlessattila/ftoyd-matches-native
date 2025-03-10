import { useMedia } from "@/shared/lib/use-media";
import React, { ReactNode } from "react";
import styled from "styled-components/native";

type LayoutProps = {
  children?: ReactNode;
};

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.dark[800]};
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  max-width: 1836px;
  margin: 0 auto;
`;

const DefaultLayout = ({ children }: LayoutProps) => {
  const breakpoints = useMedia({
    wrapper: { paddingHorizontal: { xs: 16, sm: 42 } },
    container: { paddingVertical: { xs: 32, sm: 42 } },
  });

  return (
    <Wrapper style={breakpoints.wrapper}>
      <Container style={breakpoints.container}>{children}</Container>
    </Wrapper>
  );
};

export { DefaultLayout };
