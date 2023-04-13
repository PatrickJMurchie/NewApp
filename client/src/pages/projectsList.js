import React, { useState, useEffect } from 'react';

function ProjectList() {
  const [quoteList, setQuoteList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/quotelist', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const quoteList = await response.json();
          console.log(quoteList);
          setQuoteList(quoteList);
      
          // rest of the code
        } catch (error) {
          setError(error.message);
        }
      };
      
      
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Hours Weekly</th>
          <th>Num of Workers</th>
          <th>Worker Rate</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Fudge Factor</th>
          <th>Total Cost</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(quoteList) &&
          quoteList.map((quote) => (
            <tr key={quote.userID}>
              <td>{quote.title}</td>
              <td>{quote.description}</td>
              <td>{quote.hoursWeekly}</td>
              <td>{quote.numOfWorkers}</td>
              <td>{quote.workerRate}</td>
              <td>{quote.startDate}</td>
              <td>{quote.endDate}</td>
              <td>{quote.fudgeFactor}</td>
              <td>{quote.totalCost}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ProjectList;
