import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "", Genre: "" },
    errors: {},
    genres: [],
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(100).label("Rate"),
    Genre: Joi.string().required().label("Genre"),
  };
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("submitted");
  };
  render() {
    return (
      <>
        <h1>Movie Form</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default MovieForm;
