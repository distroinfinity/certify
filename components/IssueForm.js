// import "./App.css";

import { useState } from "react";

export default function IssueForm() {
  const [wallet, setWallet] = useState("");
  const [title, setTitle] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [major, setMajor] = useState("");
  const [cgpa, setCGPA] = useState("");
  async function handleSubmit() {
    console.log(wallet, title, degreeType, major, cgpa);
    if (!wallet || title || degreeType || major || cgpa || !cover) {
      return;
    }
  }
  const [cover, setCover] = useState(null);

  async function selectCover(e) {
    const file = e.target.files[0];
    setCover(file);
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2> */}
            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="wallet-address" className="sr-only">
                  Wallet Address
                </label>
                <input
                  id="wallet-address"
                  name="wallet"
                  //   type=""
                  //   autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Wallet Address"
                  value={wallet}
                  onChange={(e) => {
                    // console.log("testing", e.target.value);
                    setWallet(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    // console.log("testing", e.target.value);
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="degree-type" className="sr-only">
                  Type Of Degree
                </label>
                <input
                  id="degreeType"
                  name="degreeType"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Type of Degree"
                  value={degreeType}
                  onChange={(e) => {
                    // console.log("testing", e.target.value);
                    setDegreeType(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="major" className="sr-only">
                  Major
                </label>
                <input
                  id="major"
                  name="major"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Major"
                  value={major}
                  onChange={(e) => {
                    // console.log("testing", e.target.value);
                    setMajor(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="cgpa" className="sr-only">
                  CGPA
                </label>
                <input
                  id="cgpa"
                  name="cgpa"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Final CGPA"
                  value={cgpa}
                  onChange={(e) => {
                    // console.log("testing", e.target.value);
                    setCGPA(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Select a image </label>
                <input
                  onChange={selectCover}
                  type="file"
                  accept=".jpeg,.jpg,.png"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500
                  border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  /> */}
                </span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
