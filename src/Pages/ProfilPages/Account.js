import React, { useState } from "react";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export function Account() {
  const [data, setData] = useState([]);
  const [openPassword, setOpenPassord] = useState(false);

  console.log(data);

  return (
    <>
      <div id="AccountInformation">
        <h1>User Information</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const firstname = e.target.firtsname.value;
            const lastname = e.target.lastname.value;
            const email = e.target.email.value;
            const brithday = e.target.brithday.value;
            const gender = e.target.gender.value;

            setData({ firstname, lastname, email, brithday, gender });
          }}
        >
          <div id="AccountForm">
            <div id="InfrForm">
              <label id="FormInput">
                <span>First name</span>
                <input type="text" name="firtsname" />
              </label>
              <label id="FormInput">
                <span>Last name</span>
                <input type="text" name="lastname" />
              </label>
              <label id="FormInput">
                <span>Email</span>
                <input type="text" name="email" />
              </label>
              <span>Gender</span>
              <div id="gender">
                <label>
                  <input type="radio" name="gender" value="male" />
                  <span>Male</span>
                </label>
                <label>
                  <input type="radio" name="gender" value="famale" />
                  <span>Famale</span>
                </label>
              </div>
              <label id="FormInput">
                <span>Date of birth</span>
                <input type="text" name="brithday" />
              </label>
              <div id="Fontrem">
                <button id="remA" onClick={()=>{
                  setOpenPassord(!openPassword)
                }}>
                  Change password
                </button>
                <div id="sds">
                  <label id="jjj333">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                    <p>Newsletter subsciption</p>
                  </label>
                </div>
              </div>
            </div>

            <div className={openPassword ? "rightForm activ" : "rightForm"}>
              <label id="FormInput">
                <span>Current password</span>
                <input type="password" name="" />
              </label>
              <label id="FormInput">
                <span>New password</span>
                <input type="password" name="" />
              </label>
              <label id="FormInput">
                <span>Confirm new password</span>
                <input type="password" name="" />
              </label>
            </div>
          </div>
          <Button type="submit" id="SinginBtn">
            save changes
          </Button>
        </form>
      </div>
    </>
  );
}
