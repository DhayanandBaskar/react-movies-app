import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const id = this.props.match.params.id;
      if (id === "new") return;

      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapToDataModel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.populateGenre();
    this.populateMovies();
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

  doSubmit = async () => {
    const movie = { ...this.state.data };
    const id = this.props.match.params.id;

    if (id !== "new") movie._id = id;
    movie.genreId = this.getGenre(movie)._id;
    delete movie.genre;

    await saveMovie(movie);
    this.props.history.push("/movies");
  };

  getGenre(movie) {
    return this.state.genres.find(g => movie.genre === g.name);
  }

  render() {
    return (
      <div>
        <h1>Movies Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genre",
            "Genre",
            this.state.genres.map(g => g.name)
          )}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
