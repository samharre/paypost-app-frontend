import { Container, CssBaseline } from '@material-ui/core';
import Header from '../components/Header';
import PostStepper from '../components/PostStepper';
import SubHeader from '../components/SubHeader';

const Post = () => {

  return (
    <>
      <Header />
      <SubHeader title='Post'>
        <CssBaseline />
        <Container maxWidth='sm'>
          <PostStepper />
        </Container>
      </SubHeader>
    </>
  );

};

export default Post;