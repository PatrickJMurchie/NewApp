import React, { useState } from 'react';

const NewProjectForm = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    hoursWeekly: "0",
    numOfWorkers: 0,
    workerRate: 0,
    startDate: "",
    endDate: "",
    fudgeFactor: 0.0,
    totalCost: 0,
  });

const [totalCost, setTotalCost] = useState(0);

const handleSubmit = async (event) => {
  event.preventDefault();
  
  //fudgefactor
  project.fudgeFactor = Math.random() * (1.2 - 0.8) + 0.8;

  const cost = project.hoursWeekly * project.numOfWorkers * project.workerRate * project.fudgeFactor;
  setTotalCost(cost);
  
  const projectData = JSON.stringify({...project, totalCost: cost});
  console.log(project)
  try {
    const token = localStorage.getItem('token');
    console.log(token)

    const response = await fetch('http://localhost:5000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: projectData
    });
  
    const data = await response.json();
  
    if (response.ok) {
      const token = data.token;
      localStorage.setItem('token', token);
    }
  } catch (error) {
    console.log(error);
  }
};
  

  //    

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={project.title}
          onChange={(event) =>
            setProject({ ...project, title: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={project.description}
          onChange={(event) =>
            setProject({ ...project, description: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Num of Hours Worked a week:
        <input
          type="number"
          value={project.hoursWeekly}
          onChange={(event) =>
            setProject({ ...project, hoursWeekly: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Num of Workers:
        <input
          type="number"
          value={project.numOfWorkers}
          onChange={(event) =>
            setProject({ ...project, numOfWorkers: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Hourly Rate:
        <input
          type="number"
          value={project.workerRate}
          onChange={(event) =>
            setProject({ ...project, workerRate: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Start Date:
        <input
          type="date"
          value={project.startDate}
          onChange={(event) =>
            setProject({ ...project, startDate: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="date"
          value={project.endDate}
          onChange={(event) =>
            setProject({ ...project, endDate: event.target.value })

          }
        />
      </label>
      <br />
      <label>
        Total Cost:
        <span>{totalCost}</span>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewProjectForm;
