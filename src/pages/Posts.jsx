import { Container, CssBaseline } from "@material-ui/core";
import Header from "../components/Header";
import PostsTable from "../components/PostsTable";
import SubHeader from "../components/SubHeader";

const Posts = () => {
  return (
    <>
      <Header />
      <SubHeader title='Posts'>
        <CssBaseline />
        <Container maxWidth='md'>
          <PostsTable />
        </Container>
      </SubHeader>
    </>
  )
};

export default Posts;