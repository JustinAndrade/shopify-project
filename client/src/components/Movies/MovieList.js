import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import MovieCard from "./MovieCard";

// const movieArr = [
//   {
//     movie: {
//       name: "Bloodsport",
//       year: 1997,
//     },
//   },
//   {
//     movie: {
//       name: "Moneyball",
//       year: 2010,
//     },
//   },
//   {
//     movie: {
//       name: "Avatar",
//       year: 2012,
//     },
//   },
//   {
//     movie: {
//       name: "Rugrats Gone Wild",
//       year: 1999,
//     },
//   },
//   {
//     movie: {
//       name: "The Avengers",
//       year: 2011,
//     },
//   },
//   {
//     movie: {
//       name: "Bloodsport",
//       year: 1997,
//     },
//   },
//   {
//     movie: {
//       name: "Bloodsport",
//       year: 1997,
//     },
//   },
//   {
//     movie: {
//       name: "Bloodsport",
//       year: 1997,
//     },
//   },
//   {
//     movie: {
//       name: "Bloodsport",
//       year: 1997,
//     },
//   },
//   {
//     movie: {
//       name: "Bloodsport",
//       year: 1997,
//     },
//   },
// ];

// Styles

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function MovieList({
  nominations,
  setNominations,
  list,
  query,
}) {
  const classes = useStyles();
  if (list.length > 1 && query.length >= 3) {
    console.log(query);
    return (
      <React.Fragment>
        {list.map((data) => {
          console.log(data);
          return (
            <MovieCard
              poster={data.Poster}
              key={data.imdbID}
              data={data}
              title={data.Title}
              year={data.Year}
              nominations={nominations}
              setNominations={setNominations}
            />
          );
        })}
      </React.Fragment>
    );
  } else if (query === "") {
    return (
      <React.Fragment>
        <h2>Start Searching... </h2>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CircularProgress />
      </React.Fragment>
    );
  }
}
