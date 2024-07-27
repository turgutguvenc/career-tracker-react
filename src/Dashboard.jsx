import { useEffect, useState } from "react";
import styled from "styled-components";
import Events from "./Events";
import Jobs from "./Job";
import useJobs from "./hooks/useJobs";
import useEvents from "./hooks/useEvents";

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

const Form = styled.form`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const CareerPath = styled.div`
  margin: 20px 0;
  text-align: center;
  color: #333;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const StatsTableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const StatsTableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

function Dashboard() {
  const [name, setName] = useState("");
  const [showCareerPath, setShowCareerPath] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  const { data: jobData } = useJobs(1);
  const { data: eventData } = useEvents(1);

  useEffect(() => {
    if (jobData) {
      setJobCount(jobData.total);
    }
  }, [jobData]);

  useEffect(() => {
    if (eventData) {
      setEventCount(eventData.total);
    }
  }, [eventData]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowCareerPath(true);
    setTimeout(() => setShowDashboard(true), 3000);
  };
  if (!showDashboard) {
    return (
      <DashboardContainer>
        <Form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
          />
          <Button type="submit">Show My Career Path</Button>
        </Form>
        {showCareerPath && (
          <CareerPath>
            <h2>{name}, here is my career path:</h2>
            <p>1. Started as a junior developer at Microsoft Company.</p>
            <p>2. Moved to Google as a mid-level developer.</p>
            <p>3. Became a senior developer at META.</p>
            <p>4. Currently working as a researcher at Google Deep Mind.</p>
          </CareerPath>
        )}
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>
      <StatsTable>
        <thead>
          <tr>
            <StatsTableHeader>Category</StatsTableHeader>
            <StatsTableHeader>Count</StatsTableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StatsTableCell>Jobs</StatsTableCell>
            <StatsTableCell>{jobCount}</StatsTableCell>
          </tr>
          <tr>
            <StatsTableCell>Events</StatsTableCell>
            <StatsTableCell>{eventCount}</StatsTableCell>
          </tr>
        </tbody>
      </StatsTable>
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

// import React from "react";
// import styled from "styled-components";
// import Events from "./Events";
// import Jobs from "./Job";

// const DashboardContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const DashboardTitle = styled.h1`
//   text-align: center;
//   color: #333;
//   margin-bottom: 30px;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   gap: 20px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const Column = styled.div`
//   flex: 1;
// `;

// function Dashboard() {
//   return (
//     <DashboardContainer>
//       <DashboardTitle>Dashboard</DashboardTitle>
//       <ContentWrapper>
//         <Column>
//           <Jobs />
//         </Column>
//         <Column>
//           <Events />
//         </Column>
//       </ContentWrapper>
//     </DashboardContainer>
//   );
// }

// export default Dashboard;
