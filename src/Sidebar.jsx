import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppContext } from './ContextAPI';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PurchaseOrderIcon from '@mui/icons-material/ShoppingCart';
import POListIcon from '@mui/icons-material/ListAlt';
import AddSpareIcon from '@mui/icons-material/AddBox';
import AddPartyIcon from '@mui/icons-material/GroupAdd';
import AddMachineIcon from '@mui/icons-material/Build';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from "./Assets/Images/logo1.png";
import "./Components/Table/table.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Image } from 'react-bootstrap';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [name, setName] = useState('');
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const profileImgUrl = localStorage.getItem("profilePic");
    const Name = localStorage.getItem("Name");
    if (profileImgUrl) {
      setProfileImg(profileImgUrl);
    }
    if (Name) {
      setName(Name);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("profilePic");
    localStorage.removeItem("Name");
    localStorage.removeItem('Token');
    navigate("/");
    window.location.reload();
  };

  const isSelected = (path) => location.pathname === path;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
           <Link to="/dashboard">
           <img src={logo} alt="Mini variant drawer" style={{ width: '20%', height: 'auto', background: "transparent" }} />
           </Link>
            <Box sx={{ flexGrow: 1 }} />
            <div className="d-flex align-items-center">
              {profileImg && (
                <div style={{ position: 'relative' }}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="profile-tooltip">Hi, {name}</Tooltip>}
                  >
                    <Image
                      src={profileImg}
                      alt="profile"
                      style={{
                        height: '42px',
                        width: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        marginRight: '10px',
                        border: '2px solid #ccc',
                      }}
                      onClick={toggleCard}
                    />
                  </OverlayTrigger>
                  {showCard && (
                    <div className="card" style={{ position: 'absolute', backgroundColor: '#E4E5E3', top: '50px', right: '10px', width: '150px', padding: '10px', borderRadius: '10px' }}>
                      <Image
                        src={profileImg}
                        alt="profile"
                        style={{
                          height: '62px',
                          width: '62px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #ccc',
                          margin: '10px auto',
                          display: 'block',
                        }}
                      />
                      <div style={{ textAlign: 'center', marginBottom: '10px' }}>Hi, {name}</div>
                      <button className="btn btn-outline-danger btn-sm" style={{ borderRadius: '5px', margin: '0 auto', display: 'block' }} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'DashBoard', path: '/dashboard', icon: <DashboardIcon /> },
              { text: 'Purchase Order', path: '/purchage', icon: <PurchaseOrderIcon /> },
              { text: 'PO List', path: '/polist', icon: <POListIcon /> },
            ].map(({ text, path, icon }, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: isSelected(path) ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Highlight selected item
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isSelected(path) ? 'primary.main' : 'inherit', // Change color of icon if selected
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: isSelected(path) ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: 'Add Spare', path: '/spare', icon: <AddSpareIcon /> },
              { text: 'Add Party', path: '/newParty', icon: <AddPartyIcon /> },
              { text: 'Add Machine', path: '/machine', icon: <AddMachineIcon /> },
            ].map(({ text, path, icon }, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: isSelected(path) ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Highlight selected item
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isSelected(path) ? 'primary.main' : 'inherit', // Change color of icon if selected
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: isSelected(path) ? 'primary.main' : 'inherit' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}
// import * as React from 'react';
// import { useState, useEffect, useContext } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { AppContext } from './ContextAPI';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PurchaseOrderIcon from '@mui/icons-material/ShoppingCart';
// import POListIcon from '@mui/icons-material/ListAlt';
// import AddSpareIcon from '@mui/icons-material/AddBox';
// import AddPartyIcon from '@mui/icons-material/GroupAdd';
// import AddMachineIcon from '@mui/icons-material/Build';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import logo from "./Assets/Images/logo1.png";
// import "./Components/Table/table.css";
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
// import { Image } from 'react-bootstrap';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function Sidebar({ children }) {
//   const theme = useTheme();
//   const { setToken } = useContext(AppContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [profileImg, setProfileImg] = useState('');
//   const [name, setName] = useState('');
//   const [showCard, setShowCard] = useState(false);

//   useEffect(() => {
//     const profileImgUrl = localStorage.getItem("profilePic");
//     const Name = localStorage.getItem("Name");
//     if (profileImgUrl) {
//       setProfileImg(profileImgUrl);
//     }
//     if (Name) {
//       setName(Name);
//     }
//   }, []);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const toggleCard = () => {
//     setShowCard(!showCard);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("profilePic");
//     localStorage.removeItem("Name");
//     localStorage.removeItem('Token');
//     navigate("/");
//     window.location.reload();
//   };

//   const isSelected = (path) => location.pathname === path;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Link to="/dashboard">
//             <img src={logo} alt="Mini variant drawer" style={{ width: '20%', height: 'auto', background: "transparent" }} />
//           </Link>
//           <Box sx={{ flexGrow: 1 }} />
//           <div className="d-flex align-items-center">
//             {profileImg && (
//               <div style={{ position: 'relative' }}>
//                 <OverlayTrigger
//                   placement="bottom"
//                   overlay={<Tooltip id="profile-tooltip">Hi, {name}</Tooltip>}
//                 >
//                   <Image
//                     src={profileImg}
//                     alt="profile"
//                     style={{
//                       height: '42px',
//                       width: '42px',
//                       borderRadius: '50%',
//                       objectFit: 'cover',
//                       cursor: 'pointer',
//                       marginRight: '10px',
//                       border: '2px solid #ccc',
//                     }}
//                     onClick={toggleCard}
//                   />
//                 </OverlayTrigger>
//                 {showCard && (
//                   <div className="card" style={{ position: 'absolute', backgroundColor: '#E4E5E3', top: '50px', right: '10px', width: '150px', padding: '10px', borderRadius: '10px' }}>
//                     <Image
//                       src={profileImg}
//                       alt="profile"
//                       style={{
//                         height: '62px',
//                         width: '62px',
//                         borderRadius: '50%',
//                         objectFit: 'cover',
//                         border: '2px solid #ccc',
//                         margin: '10px auto',
//                         display: 'block',
//                       }}
//                     />
//                     <div style={{ textAlign: 'center', marginBottom: '10px' }}>Hi, {name}</div>
//                     <button className="btn btn-outline-danger btn-sm" style={{ borderRadius: '5px', margin: '0 auto', display: 'block' }} onClick={handleLogout}>
//                       <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {[
//             { text: 'DashBoard', path: '/dashboard', icon: <DashboardIcon /> },
//             { text: 'Purchase Order', path: '/purchage', icon: <PurchaseOrderIcon /> },
//             { text: 'PO List', path: '/polist', icon: <POListIcon /> },
//           ].map(({ text, path, icon }, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 component={Link}
//                 to={path}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                   backgroundColor: isSelected(path) ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Highlight selected item
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: isSelected(path) ? 'primary.main' : 'inherit', // Change color of icon if selected
//                   }}
//                 >
//                   {icon}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: isSelected(path) ? 'primary.main' : 'inherit' }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {[
//             { text: 'Add Spare', path: '/spare', icon: <AddSpareIcon /> },
//             { text: 'Add Party', path: '/newParty', icon: <AddPartyIcon /> },
//             { text: 'Add Machine', path: '/machine', icon: <AddMachineIcon /> },
//           ].map(({ text, path, icon }, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 component={Link}
//                 to={path}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                   backgroundColor: isSelected(path) ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Highlight selected item
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: isSelected(path) ? 'primary.main' : 'inherit', // Change color of icon if selected
//                   }}
//                 >
//                   {icon}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: isSelected(path) ? 'primary.main' : 'inherit' }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${open ? drawerWidth : theme.spacing(8) + 1}px)` },
//           transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         }}
//       >
//         <DrawerHeader />
//         {children}
//       </Box>
//     </Box>
//   );
// }

