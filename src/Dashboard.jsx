import React, { useState } from "react";
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

function Dashboard() {
  const [name, setName] = useState("");
  const [showCareerPath, setShowCareerPath] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowCareerPath(true);
    setTimeout(() => setShowDashboard(true), 3000); // Show dashboard after 3 seconds
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
            <p>1. Started as a junior developer at Microsft Company.</p>
            <p>2. Moved to ABC Corp as a mid-level developer.</p>
            <p>3. Became a senior developer at DEF Ltd.</p>
            <p>4. Currently working as a lead developer at GHI Inc.</p>
          </CareerPath>
        )}
      </DashboardContainer>
    );
  }

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
