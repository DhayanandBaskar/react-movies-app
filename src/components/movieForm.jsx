import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {}
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const movie = getMovie(id);

    if (id === "new") return;
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToDataModel(movie) });
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .positive()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  mapToDataModel(movie) {
    return {
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genre: movie.genre.name
    };
  }

  doSubmit() {
    const { data } = this.state;
    saveMovie({
      title: data.title,
      genre: data.genre,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate
    });
    this.props.history.push("/movies");
  }

  render() {
    return (
      <div>
        <h1>Movies Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", getGenres().map(g => g.name))}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
