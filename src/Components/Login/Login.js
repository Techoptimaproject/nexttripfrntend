import React, { useState } from "react";
import "./Login.css";
import logo from "../img/Pinterest_Logo.svg.png";
import Landingpage from "../Landingpage/Landingpage";
import ImageSlider from "./Img_slider";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const url = "http://127.0.0.1:5000/auth/login";
  const signupnurl = "http://127.0.0.1:5000/auth/register";
  const navigate = useNavigate();

  const [emailid, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setdob] = useState('');
  const [issociallogin, setissociallogin] = useState(true);

  // const history = useHistory(); // Get the history object

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update state based on the input field's id
    if (id === "emailid") {
      setEmail(value);
    } else if (id === "Password") {
      setPassword(value);
    } else if (id === "dob") {
      setdob(value);
    }
    else if (id === 'issociallogin') {
      setissociallogin(value);

    }
  };


  const historys = useNavigate();
 
  const navtoURLpath = () => {
    historys('/landingpage/create')
  }



  const submit = async (e) => {
    debugger
    try {
      e.preventDefault();
      const response = await axios.post(signupnurl, {
        emailid: emailid,
        password: password,
        dob: dob,
        issociallogin: issociallogin
      });
      if (response.status === 200) {
        alert("Suscussfully SignUp")
        navigate('/landingpage/home');
      } else {
        console.error('Login failed', response);
        alert('Login failed: ' + response.statusText);
      }
    }
    catch {
      console.error('Login failed');
      alert('Login failed 401 error ')
    }
  };

  const LoginDetails = async (e) => {
    debugger
    e.preventDefault();
    try {
      const response = await axios.post(url, {
        emailid: emailid,
        password: password,
      });
      // navigate('/home');
      if (response.status === 200) {
        // use for  Navigate to home Page
        const userId = response.data.user_id;
        sessionStorage.setItem('user_id', userId);
        navigate('/landingpage/home');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed 401 error  service  not implimented', error)
    }
  };



  return (
    <div>
      {/* top NavBar  Before Login Start */}
      {/* <Landingpage/> */}
      <div>
        <div className="rows">
          <div className="topnav">
            {/* <div>            
              <a className="active">
              <img src={logo} alt="Pineterest Logo" width={95} height={35} />
            </a>
            </div> */}
            <a><strong>P</strong> Pintrest</a>
            <a href="#about">Today</a>
            <a href="#contact">Watch</a>
            <a href="#contact">Explore</a>
            {/* <a href="" onClick={navtoURLpath}>Create</a> */}
            <div className="login-container">
              <a href="https://help.pinterest.com/en/guide/all-about-pinterest">
                About
              </a>
              <a href="https://business.pinterest.com/en-in/">Business</a>
              <a href="#contact">Blog</a>
              <button
                type="button"
                className="btn btn-danger signup"
                data-toggle="modal"
                data-target="#myModal"
              >
                SignUp
              </button>
              <button
                type="button"
                className="btn btn-danger signup"
                data-toggle="modal"
                data-target="#myModals"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  top NavBar End  */}

      {/* SignUp Page Start  */}

      <div class="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="card shadow-2-strong">
              <div className="cancelbtn">
                {/* Close button */}
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={submit}>
                  <div className="card-body p-5 text-center">
                    <h2 className="mb-5">Welcome to Next Trip</h2>

                    <div className="form-outline mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        id="emailid"
                        onChange={handleInputChange}
                        required
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        id="Password"
                        onChange={handleInputChange}
                        required
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label">BirthDate</label>
                      <input
                        type="date"
                        id="dob"
                        onChange={handleInputChange}
                        required
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-3   ">
                      <input
                        className="form-label"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                      />
                      <label
                        className="form-control-label"
                        htmlFor="form1Example3"
                      >
                        {" "}
                        Remember password{" "}
                      </label>
                      {/* <a href="" className='forgot-password'><b>Remember your password? </b></a> */}
                    </div>

                    <button
                      className="Continue btn btn-danger btn-lg btn-block"
                      type="submit" onClick={submit}
                    >
                      Continue
                    </button>

                    <label htmlFor="">
                      <b>OR</b>
                    </label>

                    <button
                      className="btn btn-lg btn-block btn-primary mb-2 "
                      style={{ backgroundColor: "#3b5998" }}
                      type="submit"
                    >
                      <i className="fab fa-facebook-f me-2"></i>Continue with
                      Facebook
                    </button>

                    <button
                      className="googlebtn btn btn-lg btn-block btn-primary"
                      type="submit"
                    >
                      <i className="fab fa-google me-2"></i> Continue with
                      Google
                    </button>

                    <div className="form-check d-flex justify-content-start mb-3">
                      <p>By continuing, you agree to Pinterest's</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SignUp Page End  */}

      {/* Login Page Start */}
      <div className="modal fade" id="myModals" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="card shadow-2-strong">
              <div className="cancelbtn">
                {/* Close button */}
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="card-body p-5 text-center">
                  <h2 className="mb-5">Welcome to Next Trip</h2>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="typeEmailX-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailid"
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="Password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="Password"
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-check d-flex justify-content-start mb-3">
                    <a href="" className="forgot-password">
                      <b>Forgot your password? </b>
                    </a>
                  </div>

                  <button
                    className="Continue btn btn-danger btn-lg btn-block"
                    onClick={LoginDetails}
                    type="submit"
                  >
                    Log in
                  </button>

                  <label htmlFor="">
                    <b>OR</b>
                  </label>

                  <button
                    className="btn btn-lg btn-block btn-primary mb-2 "
                    style={{ backgroundColor: "#3b5998" }}
                    type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i>Continue with
                    Facebook
                  </button>

                  <button
                    className="googlebtn btn btn-lg btn-block btn-primary"
                    type="submit"
                  >
                    <i className="fab fa-google me-2"></i> Continue with Google
                  </button>

                  <div className="form-check d-flex justify-content-start mb-3">
                    <p>By continuing, you agree to Pinterest's</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageSlider />
    </div>
  );
};

export default Login;
