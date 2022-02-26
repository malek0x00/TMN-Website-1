import React, { useEffect, useState } from "react";
import {
  MediaQuery,
  Button,
  Grid,
  Col,
  Drawer,
  Menu,
  SimpleGrid,
  Burger,
  TextInput,
  Center,
  ActionIcon,
  Group,
  Text,
  List,
} from "@mantine/core"; //@mantine/core@3.2.3 

import Fade from 'react-reveal/Fade';
import { Link } from "react-router-dom";
import logo from "../media/TMN_inverted.jpg";
import { makeStyles } from "@mui/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from "axios";


const hide = { display: "none" };

let newssub = [];

let blogssub = [];

let podcastssub = [];

let eventssub = [];

//for preventing the subcategory self-cloning bug
let newssubt = [];

let blogssubt = [];

let podcastssubt = [];

let eventssubt = [];

let newsnav = [];

let blogsnav = [];

let podcastsnav = [];

let eventsnav = [];




const useStyles = makeStyles({
  button: {
    backgroundColor: "#fff",
    color: "#000000",
    marginTop: 0,
    height: "52px",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#000000 !important",
      color: "#FFFFFF",
    },
  },

  buttonDrawer: {
    backgroundColor: "#fff",
    color: "#000000",
    marginTop: 0,
    marginBottom: 50,
    height: "52px",
    width: "100%",
    borderRadius: "0px",
    fontSize: "24px",
    "&:hover": {
      backgroundColor: "#000000 !important",
      color: "#FFFFFF",
    },
  },

  fcb: {
    color: "#000000",
    "&:hover": {
      color: "#3b5998",
    },
  },

  search: {
    color: "#000000",
    "&:hover": {
      color: "#000000",
    },
  },

  ytb: {
    color: "#000000",
    "&:hover": {
      color: "#0077b5",
    },
  },

  ins: {
    color: "#000000",
    "&:hover": {
      color: "#d6249f",
    },
  },

  usr: {
    color: "#000000",
    "&:hover": {
      color: "#9f9f9f",
    },
  },
  hovermenu: {
    
    "&:hover": {
      color: "#fff",
      backgroundColor: "#000",
    },
  },
});

function NavBar() {
  const [opened, setOpened] = useState(false);
  const [searchopened, setSearchOpened] = useState(false);

  const classes = useStyles();

  const centered = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 0,
  };

  function logout() {
    localStorage.clear();
  }

  function handleSearch(){
    setSearchOpened(!searchopened);
  }

  const [user, setUser] = useState();

  useEffect(() => {
    //load subcategories from DB
    axios.get("http://localhost:3000/api/admin/allCategorys").then((response) => {
      
      response.data.forEach(sub => {
        if ((sub.refrencesTo==="news")&&(!newssubt.includes(sub.title))){
          newssub.push(<Menu.Item className={classes.hovermenu} component={Link} to={"/news/"+sub.title}>{sub.title}</Menu.Item>)
          newsnav.push(<List.Item><Link to={"/news/"+sub.title} style={{ textDecoration: 'none',fontSize:'18px', fontWeight:'400', color:'#000' }}>{sub.title}</Link></List.Item>);
          newssubt.push(sub.title);
        }
        if (sub.refrencesTo==="blogs"&&(!blogssubt.includes(sub.title))){
          blogssub.push(<Menu.Item component={Link} to={"/blogs/"+sub.title}>{sub.title}</Menu.Item>)
          blogsnav.push(<List.Item><Link to={"/blogs/"+sub.title} style={{ textDecoration: 'none',fontSize:'18px', fontWeight:'400', color:'#000' }}>{sub.title}</Link></List.Item>);
          blogssubt.push(sub.title);
        }
        if (sub.refrencesTo==="podcasts"&&(!podcastssubt.includes(sub.title))){
          podcastssub.push(<Menu.Item component={Link} to={"/podcasts/"+sub.title}>{sub.title}</Menu.Item>)
          podcastsnav.push(<List.Item><Link to={"/podcasts/"+sub.title} style={{ textDecoration: 'none',fontSize:'18px', fontWeight:'400', color:'#000' }}>{sub.title}</Link></List.Item>);
          podcastssubt.push(sub.title);
        }
        if (sub.refrencesTo==="events"&&(!eventssubt.includes(sub.title))){
          eventssub.push(<Menu.Item component={Link} to={"/events/"+sub.title}>{sub.title}</Menu.Item>)
          eventsnav.push(<List.Item><Link to={"/events/"+sub.title} style={{ textDecoration: 'none',fontSize:'18px', fontWeight:'400', color:'#000' }}>{sub.title}</Link></List.Item>);
          eventssubt.push(sub.title);
        }
        })
        
      });

  
    //make changes to navbar depending on whether there's a user logged in
    //might need further modifications to enhance readability

    const email = localStorage.getItem("email");
    //the finest piece of code written in history
    //this whole component is literally incomprehensible, seek god in case of errors


    if (email!==null){ //render when user in logged

    setUser(<Menu trigger="hover" placement="start" size="sm" zIndex={5} delay={300} gutter={-1} control={
    <Link to="/loginNavigation">
        <AccountCircleIcon className={classes.usr} style={{ fontSize: 35, marginTop: "10px", marginLeft: "30px", }}/>  
    </Link>}>
    <Menu.Item>hi, {email}</Menu.Item>
    <Menu.Item component={Link} to="/" onClick={()=>{logout()}}>logout</Menu.Item>
    </Menu>
    )

    
  }

     else{ //render when no session exist in localStorage
       
        setUser(
        <Menu trigger="hover" placement="start" size="sm" zIndex={5} delay={300} gutter={-1} control={
        <Link to="/loginNavigation">
            <AccountCircleIcon className={classes.usr} style={{ fontSize: 35, marginTop: "10px", marginLeft: "30px", }}/>  
        </Link>}>
        <Menu.Item component={Link} to="/loginNavigation">login</Menu.Item>
        </Menu>
        )
    }

    

      

  },[classes.usr,classes.hovermenu]);

  return (
    <div>
      
      <MediaQuery largerThan="md" styles={hide}>
        <div style={{ marginBottom: 50 }}>
          <Grid
            columns={9}
            style={{
              width: "101%",
              height: "60px",
              backgroundColor: "#FFFFFF",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "5",
            }}
          >
            <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                title="drawer"
                style={{position:'absolute', top:18, left:35}}
              />
            <Col span={2} style={centered}>
              <Link to="/">
                <img alt="" src={logo} style={{ height: 40 }} />
              </Link>
            </Col>

            <Col span={1} style={centered}>
              <Menu
                trigger="hover"
                placement="start"
                size="sm"
                shadow="xs"
                zIndex={5}
                delay={300}
                gutter={-1}
                style={{width:'500px'}}
                control={
                  <Button
                    component={Link}
                    to="/news"
                    className={classes.button}
                    style={{ useStyles }}
                  >
                    News
                  </Button>
                }
              >
                {newssub}
              </Menu>
            </Col>

            <Col span={1} style={centered}>
              <Menu
                trigger="hover"
                placement="start"
                size="sm"
                shadow="xs"
                zIndex={5}
                delay={300}
                gutter={-1}
                control={
                  <Button
                    component={Link}
                    to="/blogs"
                    className={classes.button}
                    style={{ useStyles }}
                  >
                    Blogs
                  </Button>
                }
              >
                {blogssub}
              </Menu>
            </Col>

            <Col span={1} style={centered}>
              <Menu
                trigger="hover"
                placement="start"
                size="sm"
                shadow="xs"
                zIndex={5}
                delay={300}
                gutter={-1}
                control={
                  <Button
                    component={Link}
                    to="/events"
                    className={classes.button}
                    style={{ useStyles }}
                  >
                    Events
                  </Button>
                }
              >
                {eventssub}
              </Menu>
            </Col>

            <Col span={1} style={centered}>
              <Menu
                trigger="hover"
                placement="start"
                size="sm"
                shadow="xs" 
                zIndex={5}
                delay={300}
                gutter={-1}
                control={
                  <Button
                    component={Link}
                    to="/podcasts"
                    className={classes.button}
                    style={{ useStyles }}
                  >
                    Podcasts
                  </Button>
                }
              >
                {podcastssub}
              </Menu>

            </Col>

            <Col span={1} offset={1} style={centered}>
              <SimpleGrid cols={4}>
                
                {searchopened?
                <CloseRoundedIcon className={classes.search} onClick={() => handleSearch()}/>
                :
              <SearchRoundedIcon className={classes.search} onClick={() => handleSearch()}/>
                }
                <a href="https://www.facebook.com/TunisianModernNewspaperOfficiel">
                  <FacebookIcon className={classes.fcb} />
                </a>
                <a href="https://www.instagram.com/tunisian_modern_newspaper/">
                  <InstagramIcon className={classes.ins} />
                </a>
                <a href="https://www.linkedin.com/company/tunisian-modern-newspaper/">
                  <LinkedInIcon className={classes.ytb} />
                </a>
                
              </SimpleGrid>
            </Col>
            <Col span={1} style={centered}>
              {user}
            </Col>
          </Grid>
        </div>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={hide}>
        <div style={{ marginBottom: 50 }}>
          <Grid
            columns={9}
            style={{
              width: "101%",
              height: "60px",
              backgroundColor: "#FFFFFF",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "5",
            }}
          >
            <Col span={3} style={centered}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                title="drawer"
              />
              
            </Col>
            <Col span={3} style={centered}>
              <Link to="/">
                <img alt="" src={logo} style={{ height: 40 }} />
              </Link>
            </Col>
            <Col span={3} style={centered}>

            {searchopened?
                <CloseRoundedIcon className={classes.search} onClick={() => handleSearch()}/>
                :
              <SearchRoundedIcon className={classes.search} onClick={() => handleSearch()}/>
                }
              <Link to="/loginNavigation">
                <AccountCircleIcon
                  className={classes.usr}
                  style={{
                    fontSize: 35,
                    marginTop: "10px",
                    marginLeft: "30px",
                  }}
                />
              </Link>
              
            </Col>
            
            
          </Grid>
        </div>
      </MediaQuery>
      
      <Fade top when={searchopened} duration={500}>
      <div style={{backgroundColor:'#ffffff', width:'100%', height:'60px',position:'fixed',zIndex:4,top:50,left:0, display:searchopened ? "" : 'none'}}>
        <Center style={{height:'100%'}}>
            <TextInput variant="filled" style={{width:'80%'}} ></TextInput>
            <ActionIcon variant="light" style={{marginLeft:10,width:40, height:40, borderRadius:50}}>
              <SearchRoundedIcon/>
            </ActionIcon>
        </Center>

      </div>
      </Fade>
      <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={<img alt="" src={logo} style={{ height: 40 }} />}
                padding="xs"
                size="100%"
                >
                   <div style={{backgroundColor:'#ffffff', width:'100%', height:'60px',position:'fixed',zIndex:4,top:50,left:0}}>
                      <Center style={{height:'100%'}}>
                        <TextInput variant="filled" style={{width:'80%'}} ></TextInput>
                        <ActionIcon variant="light" style={{marginLeft:10,width:40, height:40, borderRadius:50}}>
                        <SearchRoundedIcon/>
                        </ActionIcon>
                      </Center>

      </div>
                  <Group position="apart" style={{marginTop:'75px'}}>
                    <div style={{ width:'180px'}}>
                      <Link to="/news" style={{ textDecoration: 'none' }}>
                      <Text style={{fontSize:'26px', fontWeight:'700', textDecoration:'none'}}>News</Text>
                      </Link>
                      <List style={{marginLeft:10}}>
                        {newsnav}
                      </List>
                      
                    </div>
                    <div style={{width:'180px'}}>
                    <Link to="/blogs" style={{ textDecoration: 'none' }}>
                      <Text style={{fontSize:'26px', fontWeight:'700', textDecoration:'none'}}>Blogs</Text>
                      </Link>
                      <List style={{marginLeft:10}}>
                        {blogsnav}
                      </List>
                    </div>
                    <div style={{width:'180px'}}>
                    <Link to="/events" style={{ textDecoration: 'none' }}>
                      <Text style={{fontSize:'26px', fontWeight:'700', textDecoration:'none'}}>Events</Text>
                      </Link>
                      <List style={{marginLeft:10}}>
                        {eventsnav}
                        edseds
                      </List>
                    </div>
                    <div style={{width:'180px'}}>
                    <Link to="/podcasts" style={{ textDecoration: 'none' }}>
                      <Text style={{fontSize:'26px', fontWeight:'700', textDecoration:'none'}}>Podcasts</Text>
                      </Link>
                      <List style={{marginLeft:10}}>
                        {podcastsnav}
                      </List>
                    </div>
                    <SimpleGrid
                  spacing="xl"
                  cols={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    position:'absolute', 
                    alignSelf:'center',
                    width:'100%',
                    bottom:10, 
                  }}
                >
                  <a href="https://www.facebook.com/TunisianModernNewspaperOfficiel" >
                    <FacebookIcon
                      style={{ fontSize: "48px" }}
                      className={classes.fcb}
                    />
                  </a>
                  <a href="https://www.instagram.com/tunisian_modern_newspaper/">
                    <InstagramIcon
                      style={{
                        marginLeft: 50,
                        marginRight: 50,
                        fontSize: "48px",
                      }}
                      className={classes.ins}
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/tunisian-modern-newspaper/">
                    <LinkedInIcon
                      style={{ fontSize: "48px" }}
                      className={classes.ytb}
                    />
                  </a>
                </SimpleGrid>
                    
                    </Group>
                    
                
                
              </Drawer>
    </div>
  );
}

export default NavBar;
