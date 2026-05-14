import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/layouts/Navbar";

import {candidateAPI} from "../components/services/api";

function CandidateDetails () {

  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate =
    async () => {

      try {

        const response = await candidateAPI.getCandidates();

        const selectedCandidate = response.data.find( (candidate) => candidate.id === id );

        setCandidate( selectedCandidate);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const updateStatus =
    async (status) => {

      try {

        const updatedData = { ...candidate, status, };

        await candidateAPI.updateCandidate( id, updatedData );

        setCandidate(updatedData);

      } catch (error) {

        console.log(error);
      }
    };

  if (loading) {

    return <h1>Loading...</h1>;
  }

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-5">

          <div className="bg-white rounded-2xl shadow p-8">

            <div className="flex flex-col md:flex-row items-center gap-5">

              <img src={`https://i.pravatar.cc/150?img=${candidate.id}`} className="rounded-full w-32 h-32" />

              <div>

                <h1 className="text-3xl font-bold"> {candidate.name} </h1>

                <p className="text-gray-500"> {candidate.role}</p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">

              <div className="bg-gray-100 p-5 rounded-xl">

                <h2 className="text-xl font-bold mb-4">Candidate Info </h2>

                <p>  <strong>Experience: </strong>{" "}{candidate.experience} </p>

                <p><strong> Score:</strong>{" "}{candidate.score} </p>

                <p> <strong> Status: </strong>{" "} {candidate.status} </p>

              </div>

              <div className="bg-gray-100 p-5 rounded-xl">

                <h2 className="text-xl font-bold mb-4"> Skills </h2>

                <div className="flex flex-wrap gap-3">

                  {candidate.skills?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

            </div>

            <div className="mt-8 flex gap-4 flex-wrap">

              <button onClick={() => updateStatus( "Selected" ) } className="bg-green-600 text-white px-6 py-3 rounded-xl">
                Accept
              </button>

              <button onClick={() => updateStatus( "Rejected") } className="bg-red-600 text-white px-6 py-3 rounded-xl">
                Reject
              </button>

              <button onClick={() =>  updateStatus( "Reviewing") } className="bg-yellow-500 text-white px-6 py-3 rounded-xl">
                Reviewing
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CandidateDetails;