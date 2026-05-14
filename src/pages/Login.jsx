import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import * as Yup from "yup";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
       const isLoggedIn = localStorage.getItem( "isLoggedIn" );

    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  // VALIDATION

  const validationSchema =
    Yup.object({

      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6,"Password must be at least 6 characters" )
        .required("Password is required"),
    });

  // FORMIK

  const formik =
    useFormik({

      initialValues: {

        email: "",
        password: "",
      },

      validationSchema,

      onSubmit: (values) => {

        // SAVE LOGIN DATA

        localStorage.setItem("isLoggedIn",true);

        localStorage.setItem("email",values.email);

        localStorage.setItem("password",values.password);

        navigate("/dashboard");
      },
    });

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">ATS Login</h1>

        <form onSubmit={ formik.handleSubmit}>

          {/* EMAIL */}

          <div className="mb-4">

            <input type="email" name="email" placeholder="Email" className="w-full border p-3 rounded"
              value={ formik.values.email }
              onChange={formik.handleChange }
              onBlur={formik.handleBlur}
            />

            {formik.touched.email &&
              formik.errors.email && (

                <p className="text-red-500 text-sm mt-1"> {formik.errors.email} </p>
              )}

          </div>

          {/* PASSWORD */}

          <div className="mb-4">

            <input type="password" name="password" placeholder="Password" className="w-full border p-3 rounded"
              value={ formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.password &&
              formik.errors.password && (

                <p className="text-red-500 text-sm mt-1"> {formik.errors.password}</p>
              )}

          </div>

          {/* BUTTON */}

          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;