import React, { useEffect, useState } from 'react'
import { candidateAPI, jobsAPI } from '../components/services/api';
import Sidebar from "../components/layouts/Sidebar"
import Navbar from '../components/layouts/Navbar';
import SummaryCard from "../components/cards/SummaryCard"
import DashboardChart from "../components/charts/DashboardChart"
function Dashboard() {

  const [candidates, setCandidates] = useState([]);

  const [jobs, setJobs] = useState([]);

  useEffect(function () {
    fetchData();
  }, []);

  async function fetchData() {

    try{
      const  candidateResponse = await candidateAPI.getCandidates();

      const jobsResponse = await jobsAPI.getJobs();

      setCandidates(candidateResponse.data);

      setJobs(jobsResponse.data);
    } catch(error){

      console.log(error)
    }
  
  }
    const selected = candidates.filter(function (c) {
      return c.status === "Selected";
    }).length;

  const rejected = candidates.filter(function (c) {
      return c.status === "Rejected";
    }).length;

  const reviewing = candidates.filter(function (c) {
      return c.status === "Reviewing";
    }).length;

  return (
    <>
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-5">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <SummaryCard title="Total Jobs" value={jobs.length}/>

            <SummaryCard title="Candidates" value={candidates.length}/>

            <SummaryCard title="Selected" value={selected}/>

            <SummaryCard title="Reviewing" value={reviewing}/>

          </div>

          <DashboardChart selected={selected} rejected={rejected} reviewing={reviewing} />

        </div>

      </div>

    </div>
    </>
  )
}

export default Dashboard