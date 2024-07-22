import { useState } from "react";
import useJobs from "./hooks/useJobs";
import styled from "styled-components";

const JobContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const JobList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const JobItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const JobTitle = styled.h3`
  margin: 0 0 10px;
  color: #333;
`;

const JobInfo = styled.p`
  margin: 5px 0;
  color: #666;
`;

const JobLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0052a3;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-weight: bold;
`;

const JobItemComponent = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <JobItem>
      <JobTitle>{job.title}</JobTitle>
      <JobInfo>{job.company_name}</JobInfo>
      <JobInfo>{job.location}</JobInfo>
      <JobInfo>{job.date}</JobInfo>
      <JobLink href={job.url} target="_blank" rel="noopener noreferrer">
        More Info
      </JobLink>
      <JobInfo>
        {isExpanded ? job.description : `${job.description.split(".")[0]}...`}
      </JobInfo>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </ToggleButton>
    </JobItem>
  );
};

const Jobs = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useJobs(page);

  if (isLoading) return <JobContainer>Loading...</JobContainer>;
  if (error)
    return <JobContainer>An error occurred: {error.message}</JobContainer>;

  return (
    <JobContainer>
      <h2>Job Listings</h2>
      <JobList>
        {data.jobs.map((job, index) => (
          <JobItemComponent key={job.url + index} job={job} />
        ))}
      </JobList>
      <PaginationContainer>
        <PaginationButton
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </PaginationButton>
        <PageInfo>
          Page {page} of {Math.ceil(data.total / data.per_page)}
        </PageInfo>
        <PaginationButton
          onClick={() => setPage((old) => old + 1)}
          disabled={page >= Math.ceil(data.total / data.per_page)}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </JobContainer>
  );
};

export default Jobs;
