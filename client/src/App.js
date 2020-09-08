import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import Container from "@material-ui/core/Container";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

import MovieList from "./components/Movies/MovieList";

import "./App.css";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function App() {
  const [nominations, setNominations] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [query, setQuery] = useState("");
  const [myNominations, setMyNominations] = useState([]);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const searchMovies = () => {
    const API_KEY = process.env.DB_KEY;
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=3fee03f0`)
      .then((res) => res.json())
      .then((result) => {
        let movies = result.Search;
        if (movies) {
          setMovieList(movies);
        }
      });
  };

  useEffect(() => {
    searchMovies();
  });

  return (
    <div className="App">
      {/* Navigation */}
      <div className={classes.grow}>
        <AppBar position="static" style={{ backgroundColor: "#004c3f" }}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              The Shoppies
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                // name="query"
                value={query}
                onChange={handleChange}
                // onChange={setQuery}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={handleClick}
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Typography style={{ fontSize: "16px", marginRight: "5px" }}>
                  Nominations
                </Typography>
                <Badge badgeContent={nominations.length} color="secondary">
                  <LocalMoviesIcon />
                </Badge>
              </IconButton>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {nominations.map((nomination) => {
                  return (
                    <StyledMenuItem>
                      <ListItemText primary={nomination} />
                    </StyledMenuItem>
                  );
                })}
              </StyledMenu>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={nominations.length} color="secondary">
                  <LocalMoviesIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* End of Navigation */}
      <Container
        maxWidth="xl"
        style={{
          marginTop: "2%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <MovieList
          nominations={nominations}
          setNominations={setNominations}
          list={movieList}
          query={query}
          myNominations={myNominations}
          setMyNominations={setMyNominations}
        />
      </Container>
    </div>
  );
}

export default App;
