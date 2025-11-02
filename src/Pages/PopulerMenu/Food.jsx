import { useEffect, useState } from "react";
import MenuItem from "../Share/MenuItem";

const Food = ({item}) => {
  const [menu, setMenu] = useState([]);
  const popular = menu.filter(item => item.category === 'popular')

  // useEffect(() => {
  //   fetch('menu.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       const populerItem = data.filter(item => item.category === 'populer');
  //       setMenu(populerItem);
  //     })
  //     .catch(error => console.error("Error loading menu:", error));
  // }, []);

  return (
    <div className="">
      {popular.map(item => (
        <MenuItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};

export default Food;
