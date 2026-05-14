import { useEffect, useState } from "react";

import { useFormik } from "formik";

import * as Yup from "yup";

import Sidebar from "../components/layouts/Sidebar";

import Navbar from "../components/layouts/Navbar";

import { jobsAPI } from "../components/services/api";

function Jobs () {

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const response = await jobsAPI.getJobs();
        setJobs(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // VALIDATION

  const validationSchema =
    Yup.object({

      title: Yup.string() .min(3, "Minimum 3 characters") 
                          .required("Job title is required"),

      department: Yup.string()
        .required("Department is required"),

      openings: Yup.number() .min(1, "Minimum 1 opening")
                             .required("Openings required"),

      applicants: Yup.number() .min(0, "Applicants cannot be negative")
                               .required("Applicants required"),

      status: Yup.string().required("Status required"),
    });

  // FORMIK

  const formik = useFormik({

    initialValues: {

      title: "",
      department: "",
      openings: "",
      applicants: "",
      status: "",
    },

    validationSchema,

    onSubmit: async (
      values,
      { resetForm }
    ) => {

      try {

        // UPDATE

        if (editingId) {

          const response = await jobsAPI.updateJob( editingId, values );

          const updatedJobs =
            jobs.map((job) =>job.id === editingId ? response.data : job );

          setJobs(updatedJobs);

          setEditingId(null);

        } else {

          // ADD

          const response = await jobsAPI.addJob( values );

          setJobs([ ...jobs, response.data,]);
        }

        resetForm();

      } catch (error) {

        console.log(error);
      }
    },
  });

  const handleDelete =
    async (id) => {

      try {

        await jobsAPI.deleteJob(id);

        setJobs( jobs.filter( (job) => job.id !== id ) );

      } catch (error) {

        console.log(error);
      }
    };

  const handleEdit = (job) => {

    setEditingId(job.id);

    formik.setValues({

      title: job.title,
      department: job.department,
      openings: job.openings,
      applicants: job.applicants,
      status: job.status,
    });
  };

  const filteredJobs =
    jobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-5">

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">

            <h1 className="text-3xl font-bold"> Job Listings </h1>

            <input type="text" placeholder="Search Jobs"
              className="border p-3 rounded-xl bg-white"
              onChange={(e) => setSearch(e.target.value) }
            />

          </div>

          {/* FORM */}

          <form onSubmit={formik.handleSubmit}
            className="bg-white p-5 rounded-2xl shadow mb-5 grid md:grid-cols-6 gap-4" >

            {/* TITLE */}

            <div>

              <input type="text" name="title" placeholder="Job Title" className="border p-3 rounded-xl w-full"
                value={ formik.values.title }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />

              {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-sm mt-1"> {formik.errors.title} </p>
                )}

            </div>

            {/* DEPARTMENT */}

            <div>

                <input type="text" name="department" placeholder="Department" className="border p-3 rounded-xl w-full"
                  value={ formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched
                  .department &&
                  formik.errors
                    .department && (

                    <p className="text-red-500 text-sm mt-1"> { formik.errors.department } </p>
                )}

            </div>

            {/* OPENINGS */}

            <div>

              <input
                type="number"
                name="openings"
                placeholder="Openings"
                value={
                  formik.values
                    .openings
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="border p-3 rounded-xl w-full"
              />

              {formik.touched
                .openings &&
                formik.errors
                  .openings && (

                  <p className="text-red-500 text-sm mt-1">
                    {
                      formik.errors
                        .openings
                    }
                  </p>
                )}

            </div>

            {/* APPLICANTS */}

            <div>

              <input
                type="number"
                name="applicants"
                placeholder="Applicants"
                value={
                  formik.values
                    .applicants
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="border p-3 rounded-xl w-full"
              />

              {formik.touched
                .applicants &&
                formik.errors
                  .applicants && (

                  <p className="text-red-500 text-sm mt-1">
                    {
                      formik.errors
                        .applicants
                    }
                  </p>
                )}

            </div>

            {/* STATUS */}

            <div>

              <select
                name="status"
                value={
                  formik.values.status
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="border p-3 rounded-xl w-full"
              >

                <option value="">
                  Select Status
                </option>

                <option value="Open">
                  Open
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

              {formik.touched.status &&
                formik.errors.status && (

                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.status}
                  </p>
                )}

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className={`${editingId
                  ? "bg-yellow-500"
                  : "bg-indigo-600"
                } text-white rounded-xl`}
            >

              {editingId
                ? "Update"
                : "Add Job"}

            </button>

          </form>

          {/* TABLE */}

          <div className="bg-white rounded-2xl shadow overflow-auto">

            <table className="w-full">

              <thead className="bg-indigo-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Job Title
                  </th>

                  <th className="text-left">
                    Department
                  </th>

                  <th className="text-left">
                    Openings
                  </th>

                  <th className="text-left">
                    Applicants
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center p-10"
                    >
                      Loading...
                    </td>

                  </tr>

                ) : filteredJobs.length >
                  0 ? (

                  filteredJobs.map(
                    (job) => (

                      <tr
                        key={job.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-4 font-semibold">
                          {job.title}
                        </td>

                        <td>
                          {job.department}
                        </td>

                        <td>
                          {job.openings}
                        </td>

                        <td>
                          {job.applicants}
                        </td>

                        <td>

                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              job.status ===
                              "Open"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {job.status}
                          </span>

                        </td>

                        <td className="flex gap-3 p-4">

                          <button
                            onClick={() =>
                              handleEdit(
                                job
                              )
                            }
                            className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                job.id
                              )
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-xl"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center p-10 text-gray-500"
                    >
                      No Jobs Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Jobs;