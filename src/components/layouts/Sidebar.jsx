import { Briefcase, LayoutDashboard, LogOut, Users } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {

    const navigate = useNavigate();
    function handleLogout(){
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    }



  return (
    <>
    <div className='w-64 bg-indigo-700 text-white min-h-screen p-5 hidden md:block'>
        <h1 className='text-2xl font-bold mb-10'> ATS Dashboard</h1>
        <div className='space-y-5'>
            <Link to='/dashboard' className='flex items-center gap-2 hover:text-yellow-300'>
                <LayoutDashboard size={20}/> Dashboard
            </Link>

            <Link to='/jobs' className='flex items-center gap-2 hover:text-yellow-300'>

                <Briefcase size={20}/> Jobs
            
            </Link>

            <Link to='/candidates' className='flex items-center gap-2 hover:text-yellow-300'>

                <Users size={20} /> Candidates
            
            </Link>

            <button onClick={handleLogout} className='flex items-center gap-2 mt-10'>

                <LogOut size={20}/> Logout
            </button>

        </div>

    </div>

    </>
  )
}

export default Sidebar