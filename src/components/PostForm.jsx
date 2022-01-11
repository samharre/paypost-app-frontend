import {
  FormControl,
  FormLabel,
  TextField
} from "@material-ui/core";

const PostForm = ({ post, setPost }) => {

  return (
    <FormControl fullWidth>
      <FormLabel component="legend" style={{ paddingBottom: '20px' }}>2. Create Post</FormLabel>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={post}
        onChange={e => setPost(e.target.value)}
      />
    </FormControl>
  )

};

export default PostForm;