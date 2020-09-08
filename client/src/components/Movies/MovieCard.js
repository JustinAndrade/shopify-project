import React from "react";
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
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = ({ nominations, setNominations }) => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        style={{ height: "100px" }}
        title={title}
        subheader={`(${year})`}
      />
      <img
        src={poster}
        alt={title}
        style={{ width: "100%", height: "230px" }}
      />
      {/* <CardMedia className={classes.media} image={poster} title={title} /> */}
      <button
        className="nominate"
        onClick={() => setNominations([...nominations, data])}
      >
        {" "}
        <span>Nominate</span>{" "}
      </button>
    </Card>
  );
}
