import { Bell, Moon } from "lucide-react";

function Navbar(props) {

  const darkMode = props.darkMode;
  const setDarkMode = props.setDarkMode;

  return (

    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h2 className="text-xl font-bold">
        Welcome Back 👋
      </h2>

      <div className="flex items-center gap-4">

        <button
          onClick={function () {
            setDarkMode(!darkMode);
          }}
        >
          <Moon />
        </button>

        <Bell />

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
          alt="profile"
        />

      </div>

    </div>
  );
}

export default Navbar;