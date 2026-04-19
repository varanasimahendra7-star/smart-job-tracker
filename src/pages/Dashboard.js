import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

function Dashboard() {
  const { applications } = useContext(ApplicationContext);

  const interviewing = applications.filter(
    (a) => a.status === "Interviewing"
  ).length;

  const offers = applications.filter(
    (a) => a.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  const savedJobs = applications.filter(
    (a) => a.bookmarked
  ).length;

  const overdue = applications.filter(
    (a) =>
      a.deadline &&
      new Date(a.deadline) < new Date()
  ).length;

  const recentJobs = [...applications]
    .sort((a,b)=>b.id-a.id)
    .slice(0,3);

  return (
    <div className="card">
      <h1>Dashboard Analytics</h1>

      <div className="stat-grid">
        <div className="stat-box">
          Total Applications: {applications.length}
        </div>

        <div className="stat-box">
          Interviews: {interviewing}
        </div>

        <div className="stat-box">
          Offers: {offers}
        </div>

        <div className="stat-box">
          Rejected: {rejected}
        </div>

        <div className="stat-box">
          Saved Jobs: {savedJobs}
        </div>

        <div className="stat-box">
          Overdue Deadlines: {overdue}
        </div>
      </div>

      <h2 style={{ marginTop: "30px" }}>
        Recent Applications
      </h2>

      {recentJobs.length === 0 ? (
        <p>No applications added yet.</p>
      ) : (
        recentJobs.map((job)=>(
          <div
            key={job.id}
            className="app-item"
          >
            <div>
              <strong>
                {job.company}
              </strong>
              <br/>
              {job.role}
              <br/>
              Status: {job.status}
              <br/>
              Deadline: {job.deadline || "N/A"}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;