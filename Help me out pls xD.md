Hello guys! I have a problem and I was wondering if you could maybe help me out. 

The problem is the following: I'm trying to upload an image from the client side of the app to my file structure ('/images/profile_pictures/').
When I load the image on the client side of the app I have no issues. I have a useReducer hook to help me out in keeping state of everything (it's a component to add a new user to the database).
The reducer state has the following structure:

```js
  // Initial state
  const form_initial_state = {
    username: '',
    password: '',
    first_names: '',
    last_names: '',
    security_lvl: 2,
    profile_picture: ''
  };

  // Reducer function
  const formReducer = (state, action) => {
    switch(action.type) {
      case 'setUsername': {
        return { ...state, username: action.payload };
      };
      case 'setPassword': {
        return { ...state, password: action.payload };
      };
      case 'setFirstNames': {
        return { ...state, first_names: action.payload };
      };
      case 'setLastNames': {
        return { ...state, last_names: action.payload };
      };
      case 'setSecurityLvl': {
        return { ...state, security_lvl: parseInt(action.payload, 10) };
      };
      case 'setProfilePicture': {
        return { ...state, profile_picture: action.payload };
      };
    };
  };

  // ...

  const [ formState, dispatch ] = useReducer(formReducer, form_initial_state);
```

Once I click a button. I send the formState through a post request to the server

```js
  const addUser = async (form) => {
    const add_user_request = await (await axios.post('/api/users/addUser', form)).data;
    console.log(add_user_request);
  }

  // ...

  <Button rightIcon={<AiOutlineUserAdd/>} colorScheme="blue" onClick={() => addUser(formState)}>Agregar</Button>
```

Everything on the client side seems to be working fine. If I console.log the formState.profile_picture I get the following object:

```js

  profile_picture: File { name: "Screenshot 2021-02-16 105714.png", lastModified: 1613494637632, size: 75223, … }
    lastModified: 1613494637632
    name: "Screenshot 2021-02-16 105714.png"
    size: 75223
    type: "image/png"
    webkitRelativePath: ""
```

So now I just need to save the file and add the user to the database

```js
  // /api/users/addUser
  import fs from "fs";

  const saveFile = async (file) => {
    return new Promise((resolve, reject) => {
      const data = fs.readFileSync(file.path);
      fs.writeFileSync(`/images/profile_picture/${file.name}`, data);
      fs.unlinkSync(file.path);
      if (err) throw err;

      return err ? reject(false) : resolve(true);
    });
  };

  export default function (req, res) {
    return new Promise((resolve, reject) => {
      if(req.method === "POST") {
        const { username, password, first_names, last_names, profile_picture } = req.body;
        console.log(username, password, first_names, last_names, profile_picture );
        
        // saveFile(profile_picture);
      } else {
        res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
        reject();
      }
    });
  };
```

The server logs the username, password, first_names and last_names correctly. But the profile_picture object is empty and I'm not exactly sure why.
Any ideas? Thanks in advance