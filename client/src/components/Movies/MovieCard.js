import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GradeIcon from "@material-ui/icons/Grade";

import shopifyPlaceholder from "../../assets/placeholder.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    maxWidth: 200,
    marginTop: 15,
    marginBottom: 25,
    marginRight: 75,
    marginLeft: 75,
  },
  media: {
    // height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function MovieCard({
  data,
  title,
  year,
  nominations,
  setNominations,
  poster,
  key,
  id,
}) {
  const classes = useStyles();

  const nominateMovie = () => {
    console.log("clicked");
    if (nominations.includes(id)) {
      console.log("already in here");
    } else {
      setNominations([...nominations, { id, title, year }]);
    }
  };

  const unnominateMovie = (id) => {
    console.log(id);
    for (let i in nominations) {
      if (id === nominations[i]) {
        nominations.splice(i, 1);
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        style={{ height: "100px" }}
        title={title}
        subheader={`(${year})`}
      />
      {poster === "N/A" && (
        <img
          src={shopifyPlaceholder}
          alt={title}
          style={{ width: "100%", height: "230px" }}
        />
      )}
      {poster !== "N/A" && (
        <img
          src={poster}
          alt={title}
          style={{ width: "100%", height: "230px" }}
        />
      )}
      {/* <CardMedia className={classes.media} image={poster} title={title} /> */}

      <button
        disabled={
          nominations.length >= 5 && !nominations.includes(id) ? true : false
        }
        className={nominations.includes(id) ? "nominate nominated" : "nominate"}
        onClick={
          !nominations.includes(id) ? nominateMovie : () => unnominateMovie(id)
        }
      >
        <span>{nominations.includes(id) ? "NOMINATED" : "Nominate"}</span>
      </button>
    </Card>
  );
}
