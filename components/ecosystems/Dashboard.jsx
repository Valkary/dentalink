import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import AppointmentList from "../atoms/AppointmentList";
import UserProfile from "../atoms/UserProfile";

const Dashboard = ({ userCreds }) => {
  const { first_name, last_name } = userCreds;

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="flex-start" 

      pl="1rem"
      pr="1rem"
      minHeight="100vh"
      height="100%"
      width="95vw"
    >
      <Flex direction="row" justify="flex-start" align="center" pt="0.5rem">
        <div className="ten">
          <h1>Dashboard - {first_name} {last_name}</h1>
        </div>
      </Flex>

      <Grid
        width={"100%"}
        height={"100%"}
        gridTemplateColumns={"[user-options] 70% [itinerary] 25%"}
        overflowY={"scroll"}
        overflowX={"visible"}
        style={{
          "-ms-overflow-style": "none",
          "scrollbar-width": "none" 
        }}
        columnGap={5}
      >
        <GridItem
          gridColumnStart={1}
          gridColumnEnd={2}
        >
          <UserProfile userCreds={userCreds}/>
        </GridItem>
        <GridItem
          gridColumnStart={2}
          gridColumnEnd={3}
          maxH={"100%"}
        >
          <AppointmentList/>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Dashboard;