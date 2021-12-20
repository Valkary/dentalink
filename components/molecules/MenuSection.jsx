import { List, Text } from "@chakra-ui/react";
import MenuItem from "../atoms/MenuItem";

const MenuSection = ({ children, pageSelector }) => {

  return (
    children.map(entry => {
      const [title, routes] = [entry[1].title, entry[1].routes];
      const route_entries = Object.entries(routes);
  
      return (
        <List spacing={3} key={`menu_section_${title}`}>
          <Text
            fontSize='2xl' 
            color='white'
            as="i"
          >
            { title }
          </Text>
          <List spacing={2} pl="7%">
            <MenuItem item={route_entries} pageSelector={pageSelector}></MenuItem>
          </List>
        </List>
      )
    })
  );
}

export default MenuSection;