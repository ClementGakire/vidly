import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    name: Joi.string().required().min(5).label("name"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = () => {
    console.log("submitted");
  };
  render() {
    return (
      <>
        <h1>Register</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("name", "Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </>
    );
  }
}

export default RegisterForm;
