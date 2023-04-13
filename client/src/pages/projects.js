import React, { useState } from "react";

const NewProjectForm = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    numOfWorkers: 0,
    workerRate: 0,
    startDate: "",
    endDate: "",
    totalCost: 0,
  });

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(event)
  const projectData = JSON.stringify(project);
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
        Num of hours worked:
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
        Worker Rate:
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
        <input
          type="number"
          value={project.totalCost}
          onChange={(event) =>
            setProject({ ...project, totalCost: event.target.value })
          }
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewProjectForm;
