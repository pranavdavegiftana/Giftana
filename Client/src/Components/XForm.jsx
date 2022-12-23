import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
// import Loading from "./Loading"
import Error from "./pages/Error";
import Loading from "./pages/Loading";

export default function XForm({ postTo }) {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState({
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let name, value;
  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   setAdmin({ ...admin, [name]: value });
  // };
  const handleInputs = (name, value) => {
    setAdmin({ ...admin, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    console.log(
      admin.adminName,
      admin.email,
      admin.password,
      admin.confirmPassword
    );
    // --

    setError("");

    if (admin.password !== admin.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // setMessage(null);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        setLoading(true);

        const { adminName, password, email } = admin;
        // const { data } = await axios.post(
        //   "localhost:3000/api/admin/register",
        //   { adminName,  password, email },
        //   config
        // );

        const res = await fetch("http://localhost:3000/api/admin/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminName: adminName,
            password: password,
            email: email,
          }),
        });
        const data = await res.json();
        console.log(data);
        setMessage("Registration has done successfully");
        setError("");
        setLoading(false);

        // localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
        console.log(error.response.data.message);
      }
    }
    // --
  };

  return (
    <>
      {error && <Error> {error}</Error>}
      {message && <Error varient="danger"> {message}</Error>}
      {loading && <Loading />}
      <form
        className="adminForm m-4"
        // action={postTo}
        // onSubmit={postData}
        // method="POST"
      >
        <InputField id="xxx001" label="ID" type="text" placeholder="ID" />
        <InputField
          type="text"
          label="Username"
          name="adminName"
          value={admin.adminName}
          // onChange={handleInputs}
           onChange={(e) => handleInputs(e.target.name, e.target.value)}
          placeholder="abcd1234"
        />
        <InputField
          type="email"
          label="Email"
          value={admin.email}
          onChange={(e) => handleInputs(e.target.name, e.target.value)}
          placeholder="abc@123gmail.com"
        />
        <InputField
          type="password"
          name="password"
          value={admin.password}
          onChange={(e) => handleInputs(e.target.name, e.target.value)}
          label="Password"
          placeholder="Password@123"
        />
        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder=" Confirm Password"
          value={admin.confirmPassword}
          onChange={(e) => handleInputs(e.target.name, e.target.value)}
        />
        <Checkbox name="gender" label="Gender" fields={["Male", "Female"]} />
        <InputField type="text" label="First Name" placeholder="John" />
        <InputField type="text" label="Last Name" placeholder="Doe" />
        <InputField type="date" label="Date of Birth" />
        <InputField type="text" label="Admin comment" name="comment" />
        <div className="row">
          <button
            className="btn btn-warning m-1 col font-weight-bold"
            type="submit"
            onClick={postData}
          >
            Save
          </button>
          <button className="btn btn-light active m-1 col font-weight-bold">
            Save and Continue Edit
          </button>
          <button className="btn btn-light active m-1 col font-weight-bold">
            Send Email
          </button>
          <button className="btn btn-light active m-1 col font-weight-bold">
            Export
          </button>
          <button
            className="btn btn-danger active m-1 col font-weight-bold"
            type="reset"
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}