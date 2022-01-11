import { Grid } from "@material-ui/core";

import Summary from "../components/Summary";
import Platforms from "../components/Platforms";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

const Dashboard = () => {
  return (
    <>
      <Header />
      <SubHeader title='Dashboard'>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <Summary />
          </Grid>
          <Grid item>
            <Platforms />
          </Grid>
        </Grid>
      </SubHeader>
    </>
  );
}

export default Dashboard;