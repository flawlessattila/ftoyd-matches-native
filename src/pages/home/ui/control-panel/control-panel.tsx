import { useMatches } from "@/entities/match/api/match-list-query";
import { useScreenSizeValue } from "@/shared/lib/use-sreen-size-value";
import { Alert } from "@/shared/ui/alert/alert";
import { Button } from "@/shared/ui/button/button";
import { RefreshIcon } from "@/shared/ui/icons/icons";
import React from "react";
import styled from "styled-components/native";
import { StatusFilter, useFilter } from "../../lib/filter-context";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { StyleProp, ViewStyle } from "react-native";

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.Text`
  font-family: ${(props) => props.theme.typography.secondary.blackItalic};
  color: #fff;
`;

const LeftPart = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 24px;
  row-gap: 14px;
  max-width: 100%;
`;

const Actions = styled.View`\
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  max-width: 100%;
`;

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: "Все статусы", value: null },
  { label: "Live", value: "Ongoing" },
  { label: "Finished", value: "Finished" },
  { label: "Match preparing", value: "Scheduled" },
];

const ControlPanel = () => {
  const { refetch, isFetching, isError } = useMatches();
  const { breakpoints } = useScreenSizeValue();
  const { filter, setFilter } = useFilter();

  return (
    <Container
      style={{
        gap: breakpoints({ xs: 10, sm: 20 }),
        marginBottom: breakpoints({ xs: 32, sm: 20 }),
        flexDirection: breakpoints({ xs: "column", sm: "row" }),
        alignItems: breakpoints({ xs: "stretch", sm: "center" }),
      }}
    >
      <LeftPart
        style={{
          flexGrow: breakpoints({ xs: 1, sm: 0 }),
        }}
      >
        <Heading
          style={{
            textAlign: breakpoints({ xs: "center", sm: "left" }),
            fontSize: breakpoints({ xs: 28, sm: 32 }),
            flexGrow: breakpoints({ xs: 1, sm: 0 }),
          }}
        >
          Match Tracker
        </Heading>
        <Dropdown
          wrapperStyle={
            {
              width: breakpoints({ xs: "100%", sm: "unset" }),
            } as StyleProp<ViewStyle>
          }
          onSelect={(v) => setFilter({ status: v.value })}
          value={filter.status}
          options={statusOptions}
        />
      </LeftPart>

      <Actions
        style={{
          flexGrow: breakpoints({ xs: 1, sm: 0 }),
        }}
      >
        {isError && (
          <Alert
            style={{ flexGrow: 1 }}
            title="Ошибка: не удалось загрузить информацию"
            $appearWithAnimation
          />
        )}

        <Button
          wrapperStyle={{ flexGrow: 1 }}
          disabled={isFetching}
          onPress={refetch.bind(null, {})}
          endSlot={<RefreshIcon />}
        >
          Обновить
        </Button>
      </Actions>
    </Container>
  );
};

export { ControlPanel };
