import { useEffect, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  company: yup.string().required("Company name is required"),
  role: yup.string().required("Role is required"),
  location: yup.string(),
  salary: yup.number().typeError("Salary must be a number").nullable(),
  platform: yup.string(),
  status: yup.string().required(),
  appliedDate: yup
    .date()
    .required("Applied date is required")
    .typeError("Invalid date"),
  interviewDate: yup
    .date()
    .nullable()
    .transform((curr, orig) =>
      orig === "" ? null : curr
    ),
  deadline: yup
    .date()
    .nullable()
    .transform((curr, orig) =>
      orig === "" ? null : curr
    ),
  notes: yup.string(),
});

function AddApplication() {
  const {
    applications,
    addApplication,
    updateApplication
  } = useContext(ApplicationContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "Applied",
      appliedDate: new Date()
        .toISOString()
        .split("T")[0]
    }
  });

  useEffect(() => {
    if (id) {
      const job = applications.find(
        (app) => app.id === Number(id)
      );

      if (job) {
        const formattedJob = {
          ...job,
          appliedDate: job.appliedDate
            ? new Date(job.appliedDate)
                .toISOString()
                .split("T")[0]
            : "",
          interviewDate: job.interviewDate
            ? new Date(job.interviewDate)
                .toISOString()
                .split("T")[0]
            : "",
          deadline: job.deadline
            ? new Date(job.deadline)
                .toISOString()
                .split("T")[0]
            : ""
        };

        reset(formattedJob);
      }
    }
  }, [id, applications, reset]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      bookmarked: false
    };

    if (id) {
      updateApplication(
        Number(id),
        finalData
      );
      toast.info("Application Updated!");
    } else {
      addApplication(finalData);
      toast.success("Application Added!");
    }

    navigate("/applications");
  };

  return (
    <div
      className="card"
      style={{ maxWidth: "700px" }}
    >
      <h1>
        {id
          ? "Edit Application"
          : "Add New Application"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        <div style={{
          display:"flex",
          gap:"10px"
        }}>
          <div style={{flex:1}}>
            <label>Company *</label>
            <input
              {...register("company")}
            />
            <p style={{color:"red"}}>
              {errors.company?.message}
            </p>
          </div>

          <div style={{flex:1}}>
            <label>Role *</label>
            <input
              {...register("role")}
            />
            <p style={{color:"red"}}>
              {errors.role?.message}
            </p>
          </div>
        </div>

        <div style={{
          display:"flex",
          gap:"10px"
        }}>
          <div style={{flex:1}}>
            <label>Location</label>
            <input
              {...register("location")}
            />
          </div>

          <div style={{flex:1}}>
            <label>Salary</label>
            <input
              type="number"
              {...register("salary")}
            />
          </div>
        </div>

        <div style={{
          display:"flex",
          gap:"10px"
        }}>
          <div style={{flex:1}}>
            <label>Platform</label>
            <input
              {...register("platform")}
            />
          </div>

          <div style={{flex:1}}>
            <label>Status</label>

            <select
              {...register("status")}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div style={{
          display:"flex",
          gap:"10px"
        }}>
          <div style={{flex:1}}>
            <label>Applied Date</label>

            <input
              type="date"
              {...register(
                "appliedDate"
              )}
            />
          </div>

          <div style={{flex:1}}>
            <label>Interview Date</label>

            <input
              type="date"
              {...register(
                "interviewDate"
              )}
            />
          </div>

          <div style={{flex:1}}>
            <label>Deadline</label>

            <input
              type="date"
              {...register(
                "deadline"
              )}
            />
          </div>
        </div>

        <label>Notes</label>

        <textarea
          rows="3"
          {...register("notes")}
        />

        <button type="submit">
          {id
            ? "Update Application"
            : "Save Application"}
        </button>

      </form>
    </div>
  );
}

export default AddApplication;