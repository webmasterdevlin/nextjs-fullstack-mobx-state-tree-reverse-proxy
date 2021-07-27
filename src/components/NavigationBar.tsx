import React from "react";
import { observer } from "mobx-react";
import { useMst } from "src/store";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Box, createStyles, Link, Toolbar } from "@material-ui/core";

import TotalOfCharacters from "./TotalOfCharacters";

const NavigationBar = observer(() => {
  const classes = useStyles();

  const { postStore } = useMst();

  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Link href="/" className={classes.button} color="inherit">
            Home
          </Link>
        </Box>
        <Box>
          <Link
            href="/posts"
            className={classes.button}
            color="inherit"
            data-testid="nav-posts"
          >
            Posts
          </Link>
          <TotalOfCharacters
            total={postStore.totalPostsCount}
            dataTestId={"total-anti-heroes"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      "&:hover": {
        textDecoration: "none",
      },
      "&:focus": {
        outline: "none",
      },
      margin: "0 0.5rem",
      fontWeight: "bold",
    },
  })
);
