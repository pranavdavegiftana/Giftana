import React, { useState } from "react";
// import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login_page() {
  const navigate = useNavigate();
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
      localStorage.setItem("token", data.token);
      navigate("/categories");
    }
  };
  return (
    <>
     
          <div className="login-page-container">
            
            <div className="sub-container">
        
            <form>
              <div class="mb-3"  id="login-page-first-sec-id">
                <label for="exampleInputEmail1" class="form-label" >Username</label>
                <input type="text" class="form-control" name={admin.userName} id="exampleInputEmail1"  onChange={handleInputs}aria-describedby="emailHelp"/>
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3" id="login-page-first-sec-id">
                <label for="exampleInputPassword1"  class="form-label">Password</label>
                <input type="password" name="password" value={admin.password}
                onChange={handleInputs} class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary" onClick={postData}>Submit</button>
            
            </form>
            </div>
            </div>
          {/* </div>
        </div>
      </section> */}

    </>
  );
}
