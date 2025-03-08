"use client";
import { useScreenSizeValue } from "@/shared/lib/use-sreen-size-value";
import React, { ReactNode } from "react";
import styled from "styled-components/native";

type LayoutProps = {
  children?: ReactNode;
};

const Wrapper = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  max-width: 1836px;
  margin: 0 auto;
`;

const DefaultLayout = ({ children }: LayoutProps) => {
  const { breakpoints } = useScreenSizeValue();

  return (
    <Wrapper style={{ paddingHorizontal: breakpoints({ xs: 16, sm: 42 }) }}>
      <Container style={{ paddingVertical: breakpoints({ xs: 32, sm: 42 }) }}>
        {children}
      </Container>
    </Wrapper>
  );
};

export { DefaultLayout };
