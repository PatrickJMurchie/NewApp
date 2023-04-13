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
          console.log()
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
          <th>Total Cost</th>
        </tr>
      </thead>
      <tbody>
      <tr>
  {quoteList &&
    Object.keys(quoteList)
      .filter(key => !["_id", "userID", "quoteID","fudgeFactor"].includes(key))
      .map(key => {
        const value = quoteList[key];
        if (key === "startDate" || key === "endDate") {
          const date = new Date(value);
          return <td key={key}>{date.toLocaleDateString("en-GB")}</td>;
        } else {
          return (
            <td key={key}>
              {typeof value === "number" ? value.toFixed(2) : value}
            </td>
          );
        }
      })
  }
</tr>



    </tbody>
    </table>
  );
}

export default ProjectList;
