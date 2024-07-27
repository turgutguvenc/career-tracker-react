import { useState } from "react";
import useEvents from "./hooks/useEvents";
import styled from "styled-components";

const EventsContainer = styled.div`
  padding: 20px;
`;

const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EventItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.h3`
  margin: 0 0 10px;
  color: #333;
`;

const EventInfo = styled.p`
  margin: 5px 0;
  color: #666;
`;

const EventImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 10px 0;
`;

const EventLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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

const Events = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useEvents(page);

  if (isLoading) return <EventsContainer>Loading...</EventsContainer>;
  if (error)
    return (
      <EventsContainer>An error occurred: {error.message}</EventsContainer>
    );

  return (
    <EventsContainer>
      <h2>Events</h2>
      <EventList>
        {data.events.map((event, index) => (
          <EventItem key={`${event.url}-${index}`}>
            <EventTitle>{event.name}</EventTitle>
            <EventInfo>{event.date}</EventInfo>
            <EventInfo>{event.location}</EventInfo>
            <EventImage src={event.img_url} alt={event.name} />
            <EventLink
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Info
            </EventLink>
          </EventItem>
        ))}
      </EventList>
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
    </EventsContainer>
  );
};

export default Events;
