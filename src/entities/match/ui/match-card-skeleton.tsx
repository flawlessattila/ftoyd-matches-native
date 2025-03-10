import { useMedia } from "@/shared/lib/use-media";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import React from "react";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";

const SkeletonContainer = styled.View`
  border-radius: ${(props) => props.theme.borderRadius};
  width: 100%;
  overflow: hidden;
`;

const MatchCardSkeleton = () => {
  const breakpoints = useMedia({
    height: { xs: 103, sm: 87 },
  });
  const theme = useTheme();

  return (
    <SkeletonContainer style={breakpoints}>
      <Skeleton style={{ backgroundColor: theme.colors.dark[600] }} />
    </SkeletonContainer>
  );
};

export { MatchCardSkeleton };
