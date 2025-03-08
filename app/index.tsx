import BasicLayout from "@/shared/ui/layouts/basic-layout";
import styled from "styled-components/native";
import { HomePage } from "@/pages/home";
import { DefaultLayout } from "@/widgets/layouts";

export default function HomeView() {
  return (
    <BasicLayout>
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    </BasicLayout>
  );
}

