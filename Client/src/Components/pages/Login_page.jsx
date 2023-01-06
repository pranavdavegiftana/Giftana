import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Login_page() {
  const [admin, setAdmin] = useState({
    userName: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAdmin({ ...admin, [name]: value });

    console.log("my data is", admin.userName, admin.password);
  };

  const postData = async (e) => {
    console.log(admin.userName, admin.password);

    e.preventDefault();

    const { userName, password } = admin;

    const res = await fetch("http://localhost:3000/api/admin/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminName: userName,
        password: password,
      }),
    });
    const data = await res.json();

    console.log(data);

    if (data.success == false) {
      // setError(data.message);
      window.alert(data.message);
    } else {
      window.alert("Login successfull");
      // setMessage("Login Successfull");
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <section>
        <div className="col-1">
          <div className="login" id="main">
            <h1>SMARTSTORE</h1>
            <form>
            <div className="input-div">
              <input
                type="text"
                placeholder="username"
                name="userName"
                value={admin.userName}
                onChange={handleInputs}
              />
              <input
                type="text"
                placeholder="password"
                name="password"
                value={admin.password}
                onChange={handleInputs}
              />
            </div>
            <button className="btnn" onClick={postData}>
              Log in
            </button>
            <span class="psw">
              <a href="#">Forgot password?</a>
            </span>
          </form>
            {/* <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form> */}
          </div>
        </div>
      </section>

    </>
  );
}
