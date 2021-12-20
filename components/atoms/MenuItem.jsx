import { ListItem, Text } from "@chakra-ui/react";

const MenuItem = ({ item, pageSelector }) => {

  return (
    item.map(route => {
  
      const [title, action] = [route[1].title, route[1].action];
  
      return (
        <ListItem 
          key={`menu_item_${title}`}
          onClick={() => pageSelector(action)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2a4365"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#3182ce"
          }}
        >
          <Text 
            fontSize='lg' 
            color='white'
          >
            { title }
          </Text>
        </ListItem>
      )
    })
  );
}

export default MenuItem;