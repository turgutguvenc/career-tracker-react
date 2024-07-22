import React from "react";
import styled from "styled-components";
import Events from "./Events";
import Jobs from "./Job";

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const DashboardTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>
      <ContentWrapper>
        <Column>
          <Jobs />
        </Column>
        <Column>
          <Events />
        </Column>
      </ContentWrapper>
    </DashboardContainer>
  );
}

export default Dashboard;
