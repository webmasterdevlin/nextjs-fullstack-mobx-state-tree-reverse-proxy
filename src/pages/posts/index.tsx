import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useMst } from "src/store";
import TitleBar from "src/components/TitleBar";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import FormSubmission from "src/components/FormSubmission";
import Layout from "src/components/Layout";
import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const PostsPage = observer(() => {
  const { postStore } = useMst();

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    postStore.getPostsAction();
  }, []);
  return (
    <Layout title={"Next Mobx - Anti Posts Page"}>
      <TitleBar title={"Super Posts Page"} />
      <FormSubmission postAction={postStore.postPostAction} />
      <UpdateUiLabel />
      <>
        {postStore.loading ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          postStore.posts.map((p) => (
            <Box
              mb={2}
              key={p.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${p.title} ${p.body}`}</span>
                  {counter === p.id.toString() && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(p.id.toString())}
                  variant={"contained"}
                  color={"default"}
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => postStore.softDeletePostAction(p)}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  onClick={async () => await postStore.deletePostAction(p)}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {postStore.posts.length === 0 && !postStore.loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={postStore.getPostsAction}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
});

export default PostsPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
