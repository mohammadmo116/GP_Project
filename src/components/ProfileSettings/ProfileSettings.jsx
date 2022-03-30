import { useState, useEffect } from "react";
import React from "react";
import "./Bottom.css";
import { Button, Slide } from "@material-ui/core";
import styled from "styled-components";
import InputP from "./Input";
import ButtonP from "./Button";
import TwoFA from "../twoFactorAuth/twoFA";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";

const Input = styled("input")({
  display: "none",
});

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0 2rem 0;
  width: 100%;
`;

let ProfileSettings = () => {
  const a = localStorage.getItem("type");
  const [successPass, setSuccessPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successImg, setSuccessImg] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    current_password: "",
    password: "",
    password_confirmation: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    current_password: "",
    password: "",
    password_confirmation: "",
    image: "",
  });
  const [profileimage, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [sendimage, setSendImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/" + a + "profilePic")
      .then((response) => {
        let a = "data:image/*;base64," + response.data;
        setImage(a);
      })
      .catch((error) => {});

    axios()
      .get("/api/" + a + "user")
      .then((response) => {
        let stateInput = { ...input };
        stateInput["name"] = response.data["name"];
        stateInput["email"] = response.data["email"];
        stateInput["username"] = response.data["username"];
        stateInput["phone"] = response.data["phone"];
        response.data["two_factor_secret"] ? setTwoFA(true) : setTwoFA(false);

        console.log(response.data["two_factor_secret"]);
        console.log(twoFA);

        setInput(stateInput);
      })
      .catch((error) => {});
  }, []);

  let updateUserInfo = () => {
    axios()
      .put("/api/" + a + "user/profile-information", {
        name: input["name"],
        email: input["email"],
        username: input["username"],
        phone: input["phone"],
      })
      .then((response) => {
        if (response.status == 200) {
          setSuccessImg(false);
          setSuccessPass(false);
          setSuccess(true);
          setErrors({
            name: "",
            email: "",
            username: "",
            phone: "",
            current_password: "",
            password: "",
            password_confirmation: "",
            image: "",
          });
        }
      })
      .catch((error) => {
        setSuccessImg(false);
        setSuccessPass(false);
        setSuccess(false);
        if (!error.response) return;
        let Reserrors = error.response.data.errors;

        let stateErrrors = { ...errors };

        Object.keys(errors).forEach((element) => {
          if (Object.keys(Reserrors).includes(element)) {
            stateErrrors[element] = Reserrors[element];
          } else {
            stateErrrors[element] = "";
          }
        });

        setErrors(stateErrrors);
      });
  };

  let updateUserPass = () => {
    axios()
      .put("/api/" + a + "user/password", {
        current_password: input["current_password"],
        password: input["password"],
        password_confirmation: input["password_confirmation"],
      })
      .then((response) => {
        if (response.status == 200) {
          setSuccessImg(false);
          setSuccess(false);
          setSuccessPass(true);
          console.log("pass");

          setErrors({
            name: "",
            email: "",
            username: "",
            phone: "",
            current_password: "",
            password: "",
            password_confirmation: "",
            image: "",
          });
        }
      })
      .catch((error) => {
        setSuccessImg(false);
        setSuccessPass(false);
        setSuccess(false);
        if (!error.response) return;
        let Reserrors = error.response.data.errors;

        let stateErrrors = { ...errors };

        Object.keys(errors).forEach((element) => {
          if (Object.keys(Reserrors).includes(element)) {
            stateErrrors[element] = Reserrors[element];
          } else {
            stateErrrors[element] = "";
          }
        });

        setErrors(stateErrrors);
      });
  };

  let changed = (event, inputId) => {
    console.log(event.target.value);
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
  };

  const imageHandler = (e) => {
    setSendImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  let changePf = (e) => {
    e.preventDefault();
    let file = sendimage;
    let formdata = new FormData();
    formdata.set("image", file);
    console.log(formdata.get("image"));
    axios()
      .post("/api/" + a + "profilePic", formdata)
      .then((response) => {
        setSuccess(false);
        setSuccessPass(false);
        setSuccessImg(true);
        setErrors({
          name: "",
          email: "",
          username: "",
          phone: "",
          current_password: "",
          password: "",
          password_confirmation: "",
          image: "",
        });
      })
      .catch((error) => {
        setSuccessImg(false);
        setSuccess(false);
        setSuccessPass(false);
        if (!error.response) return;
        let Reserrors = error.response.data.errors;

        let stateErrrors = { ...errors };

        Object.keys(errors).forEach((element) => {
          if (Object.keys(Reserrors).includes(element)) {
            stateErrrors[element] = Reserrors[element];
          } else {
            stateErrrors[element] = "";
          }
        });

        setErrors(stateErrrors);
      });
  };
  return (
    <Slide in="true" direction="left">
      <div className="container">
        <div className="row  ">
          <div className="col-md-4 "></div>
          <div className="col-md-4">
            <div
              className="img-holder"
              style={{ marginTop: 30, marginLeft: "40%" }}
            >
              <img src={profileimage} alt="" id="img" className="img" />
            </div>
            <label
              style={{ marginTop: 12, marginLeft: "40%" }}
              htmlFor="contained-button-file"
            >
              <Input
                accept="image/*"
                name="profilePicc"
                id="contained-button-file"
                type="file"
                onChange={imageHandler}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
              <ButtonP onClick={changePf} placeholder="save" />
              
            </label>
          </div>
          <div class="col-md-4"></div>
        </div>

        <div class="row  " style={{ marginTop: 50 }}>
          <div class="col-md-4"></div>
          <div class="col-md-4">
            {errors["username"] ||
            errors["email"] ||
            errors["image"] ||
            success ||
            successPass ||
            successImg ? (
              <div
                class={
                  success || successPass || successImg
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                <label style={{ color: "#960000", fontWeight: "bold" }}>
                  {errors["username"][0]}
                </label>
                <label style={{ color: "#960000", fontWeight: "bold" }}>
                  {errors["email"][0]}
                </label>
                <label style={{ color: "#960000", fontWeight: "bold" }}>
                  {errors["image"][0]}
                </label>
                {success ? (
                  <label style={{ fontWeight: "bold" }}>
                    your Profile has been changed
                  </label>
                ) : (
                  ""
                )}
                {successPass ? (
                  <label style={{ fontWeight: "bold" }}>
                    your Password has been changed
                  </label>
                ) : (
                  ""
                )}
                {successImg ? (
                  <label style={{ fontWeight: "bold" }}>
                    your Profile picture has been changed
                  </label>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            
          </div>
          <div class="col-md-4"></div>
        </div>

        <div class="row  " style={{ marginTop: 50 }}>
          <div class="col-md-6">
            <InputP
              onChange={(event) => changed(event, "name")}
              input_label="name"
              type="Text"
              placeholder="Change name"
              value={input["name"]}
            />
          </div>
          <div class="col-md-6">
            <InputP
              bordercolor={errors["username"] ? "#960000" : "white"}
              onChange={(event) => changed(event, "username")}
              input_label="username"
              type="Text"
              placeholder="Change username"
              value={input["username"]}
            />
          </div>
        </div>

        <div class="row ">
          <div class="col-md-6">
            <InputP
              bordercolor={errors["email"] ? "#960000" : "white"}
              onChange={(event) => changed(event, "email")}
              input_label="email"
              type="email"
              placeholder="Change email"
              value={input["email"]}
            />
          </div>
          <div class="col-md-6">
            <InputP
              onChange={(event) => changed(event, "phone")}
              input_label="Number"
              type="Number"
              placeholder="Add PhoneNumber"
              value={input["phone"]}
            />
          </div>
        </div>

        <div class="row  ">
          <div class="col-md-6"></div>
          <div class="col-md-6">
            <ButtonP onClick={updateUserInfo} placeholder="Save Profile" />
          </div>
        </div>

        <div class="row " style={{ marginTop: 30 }}>
          <div class="col-md-6">
            <InputP
              onChange={(event) => changed(event, "current_password")}
              input_label="current password"
              type="Password"
              placeholder="current password"
            />
          </div>
          <div class="col-md-6">
            <InputP
              onChange={(event) => changed(event, "password")}
              input_label="New Password"
              type="Password"
              placeholder="New Password"
            />
          </div>
        </div>

        <div class="row  ">
          <div class="col-md-6">
            <InputP
              onChange={(event) => changed(event, "password_confirmation")}
              input_label="Confirm New Password"
              type="Password"
              placeholder="Confirm New Password"
            />
          </div>
          <div class="col-md-6">
            <ButtonP onClick={updateUserPass} placeholder="Change Password" />
          </div>
        </div>

        <label style={{ color: " #960000 ", fontWeight: "bold" }}>
          {errors["current_password"]
            ? errors["current_password"][0]
            : errors["password"]
            ? errors["password"][0]
            : ""}
        </label>

        <TwoFA key={twoFA} twoFA={twoFA}></TwoFA>
      </div>
    </Slide>
  );
};

export default ProfileSettings;