import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/layouts/Navbar";
import { candidateAPI } from "../components/services/api";

function Candidates() {

  const [candidates, setCandidates] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {

    try {

      const response = await candidateAPI.getCandidates();
      setCandidates(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // YUP VALIDATION
  const validationSchema =
    Yup.object({

      name: Yup.string()
               .min(3, "Minimum 3 characters")
               .required("Name is required"),

      role: Yup.string()
               .required("Role is required"),

      score: Yup.number()
                .min(0, "Minimum score is 0")
                .max(100, "Maximum score is 100")
                .required("Score is required"),

      experience: Yup.string()
                     .required("Experience is required"),

      skills: Yup.string()
                 .required("Skills are required"),
    });

  // FORMIK

  const formik = useFormik({

    initialValues: {
      name: "",
      role: "",
      score: "",
      experience: "",
      skills: "",
    },

    validationSchema,

    onSubmit: async (values, {
      resetForm
    }) => {

      try {

        const candidateData = {

          ...values,

          skills:
            values.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              ),

          status: "Reviewing",
        };

        // UPDATE

        if (editingId) {

          const response =
            await candidateAPI.updateCandidate(
              editingId,
              candidateData
            );

          const updatedCandidates =
            candidates.map((candidate) =>
              candidate.id === editingId
                ? response.data
                : candidate
            );

          setCandidates(
            updatedCandidates
          );

          setEditingId(null);

        } else {

          // ADD

          const response = await candidateAPI.addCandidate(candidateData);

          setCandidates([...candidates, response.data,]);
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

        await candidateAPI.deleteCandidate( id );

        setCandidates(candidates.filter( (candidate) => candidate.id !== id ));

      } catch (error) {

        console.log(error);
      }
    };

  const handleEdit = (candidate) => {

    setEditingId(candidate.id);

    formik.setValues({
      name: candidate.name,
      role: candidate.role,
      score: candidate.score,
      experience: candidate.experience,
      skills: candidate.skills?.join(", "),
    });
  };

  const filteredCandidates =
    candidates.filter((candidate) =>
      candidate.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const getStatusColor = (status) => {

    switch (status) {

      case "Selected":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-5">

          <h1 className="text-3xl font-bold mb-5">
            Candidates
          </h1>

          {/* FORM */}

          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-2xl shadow p-5 mb-5 grid md:grid-cols-6 gap-4"
          >

            {/* NAME */}

            <div>

              <input
                type="text"
                name="name"
                placeholder="Name"
                className="border p-3 rounded-xl w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.name &&
                formik.errors.name && (

                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}

            </div>

            {/* ROLE */}

            <div>

              <input type="text" name="role" placeholder="Role" className="border p-3 rounded-xl w-full"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.role &&
                formik.errors.role && (

                  <p className="text-red-500 text-sm mt-1"> {formik.errors.role} </p> )}

            </div>

            {/* SCORE */}

            <div>

              <input type="number" name="score" placeholder="Score" className="border p-3 rounded-xl w-full"
                value={formik.values.score}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.score &&
                formik.errors.score && (

                  <p className="text-red-500 text-sm mt-1"> {formik.errors.score} </p>)}

            </div>

            {/* EXPERIENCE */}

            <div>

              <input type="text" name="experience" placeholder="Experience" className="border p-3 rounded-xl w-full"
                value={ formik.values.experience }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.experience &&
                formik.errors
                  .experience && (

                  <p className="text-red-500 text-sm mt-1">{ formik.errors .experience}</p>
                )}

            </div>

            {/* SKILLS */}

            <div>

              <input type="text" name="skills" placeholder="Skills" className="border p-3 rounded-xl w-full"
                value={formik.values.skills}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.skills &&
                formik.errors.skills && (

                  <p className="text-red-500 text-sm mt-1"> {formik.errors.skills} </p>
                )}

            </div>

            {/* BUTTON */}

            <button  type="submit" className={`${editingId ? "bg-yellow-500" : "bg-indigo-600" } text-white rounded-xl`}>
              {editingId ? "Update" : "Add Candidate"}
            </button>

          </form>

          {/* SEARCH */}

          <div className="mb-5">

            <input type="text" placeholder="Search Candidate" className="border p-3 rounded-xl bg-white"
              onChange={(e) => setSearch(e.target.value) }
            />

          </div>

          {/* TABLE */}

          <div className="bg-white rounded-2xl shadow overflow-auto">

            <table className="w-full">

              <thead className="bg-indigo-600 text-white">

                <tr>
                  <th className="p-4 text-left">
                    Candidate
                  </th>
                  <th className="text-left">
                    Role
                  </th>
                  <th className="text-left">
                    Score
                  </th>
                  <th className="text-left">
                    Experience
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
                    <td colSpan="6" className="text-center p-10">
                      Loading...
                    </td>
                  </tr>

                ) : filteredCandidates.length >
                  0 ? (

                  filteredCandidates.map((candidate) => (

                      <tr key={candidate.id} className="border-b hover:bg-gray-50">

                        <td className="p-4">
                          {candidate.name}
                        </td>

                        <td>
                          {candidate.role}
                        </td>

                        <td>
                          {candidate.score}
                        </td>

                        <td>
                          {candidate.experience}
                        </td>

                        <td>

                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor( candidate.status )}`}>
                            {candidate.status }
                          </span>

                        </td>

                        <td>

                          <div className="flex gap-2">

                            <button onClick={() => handleEdit(candidate)}className="bg-yellow-500 text-white px-3 py-2 rounded-lg">
                              Edit
                            </button>

                            <button onClick={() => handleDelete(candidate.id)} className="bg-red-600 text-white px-3 py-2 rounded-lg">
                              Delete
                            </button>

                            <Link
                              to={`/candidate/${candidate.id}`}
                              className="bg-indigo-600 text-white px-3 py-2 rounded-lg"
                            >
                              Details
                            </Link>

                          </div>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>
                    <td colSpan="6" className="text-center p-10 text-gray-500">
                      No Candidates Found
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
}

export default Candidates;