import { useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { useNavigate } from "react-router-dom";

function Applications() {
  const {
    applications,
    deleteApplication,
    toggleBookmark
  } = useContext(ApplicationContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const navigate = useNavigate();

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    try {
      return new Date(dateValue).toLocaleDateString();
    } catch {
      return String(dateValue);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" || app.status === filter;

    return matchesSearch && matchesStatus;
  });

  const sortedApps = [...filteredApps].sort((a, b) =>
    sortOrder === "Newest"
      ? b.id - a.id
      : a.id - b.id
  );

  return (
    <div className="card" style={{ maxWidth: "850px" }}>
      <h1>Job Applications</h1>

      <input
        type="text"
        placeholder="Search by company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ margin: "15px 0" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      {sortedApps.length === 0 ? (
        <p>No jobs match your filters.</p>
      ) : (
        sortedApps.map((app) => (
          <div className="app-item" key={app.id}>
            <div style={{ flex: 1 }}>
              <h3>
                {app.company} — {app.role}
              </h3>

              <div>
                <strong>📍</strong> {app.location || "N/A"} <br/>
                <strong>💰</strong> {app.salary || "N/A"} <br/>
                <strong>🌐</strong> {app.platform || "N/A"} <br/>
                <strong>📅</strong> {formatDate(app.appliedDate)}
              </div>

              <p>
                Status: <strong>{app.status}</strong>
              </p>
            </div>

            <div>
              <button
                onClick={() => toggleBookmark(app.id)}
              >
                {app.bookmarked ? "★ Saved" : "☆ Save"}
              </button>

              <button
                onClick={() =>
                  navigate(`/edit/${app.id}`)
                }
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() =>
                  deleteApplication(app.id)
                }
              >
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Applications;