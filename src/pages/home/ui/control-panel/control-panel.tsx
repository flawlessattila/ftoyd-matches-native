import { useMatches } from "@/entities/match/api/match-list-query";
import { Alert } from "@/shared/ui/alert/alert";
import { Button } from "@/shared/ui/button/button";
import { RefreshIcon } from "@/shared/ui/icons/icons";
import React from "react";
import styled from "styled-components/native";
import { StatusFilter, useFilter } from "../../lib/filter-context";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMedia } from "@/shared/lib/use-media";

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

const Actions = styled.View`
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
  const { filter, setFilter } = useFilter();

  const breakpoints = useMedia({
    container: {
      gap: { xs: 10, sm: 20 },
      marginBottom: { xs: 32, sm: 20 },
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { xs: "stretch", sm: "center" },
    },
    leftPart: { flexGrow: { xs: 1, sm: 0 } },
    heading: {
      textAlign: { xs: "center", sm: "left" },
      fontSize: { xs: 28, sm: 32 },
      flexGrow: { xs: 1, sm: 0 },
    },
    dropdown: { width: { xs: "100%", sm: "unset" } },
    actions: { flexGrow: { xs: 1, sm: 0 } },
  });

  return (
    <SafeAreaView>
      <Container style={breakpoints.container as StyleProp<ViewStyle>}>
        <LeftPart style={breakpoints.leftPart}>
          <Heading style={breakpoints.heading as StyleProp<TextStyle>}>
            Match Tracker
          </Heading>
          <Dropdown
            wrapperStyle={breakpoints.dropdown as StyleProp<ViewStyle>}
            onSelect={(v) => setFilter({ status: v.value })}
            value={filter.status}
            options={statusOptions}
          />
        </LeftPart>

        <Actions style={breakpoints.actions}>
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
    </SafeAreaView>
  );
};

export { ControlPanel };
