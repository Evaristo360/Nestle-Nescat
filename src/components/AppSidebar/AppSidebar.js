import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './AppSidebar.css';
import { config } from 'providers/config';
import useLocalStorage from 'hooks/useLocalStorage';
import { createSidebarSections } from './createSidebarSections';
import { messages } from './AppSidebarMessages';
import { useTheme } from 'hooks/useTheme';
import { Grid, Button } from '@material-ui/core';
import { Images, Sidebar } from 'assets';
import { Menu } from 'components/Menu';
import { Profile } from 'views/Profiles';
import { useMyInfo } from 'hooks/useMyInfo';
import UserDrawer from 'assets/svg/Icon awesome-user-alt.svg';

const api = config.siteConfig.apiUrl;

const AppSidebar = (props) => {
  const intl = useIntl();
  const { getItem } = useLocalStorage();
  const id = getItem('user_id');
  const { role, perms, userName, userData } = useMyInfo();
  const profileImage = `${api}/${userData.image_url}`;
  const [userImage, setUserImage] = useState('');
  const { currentTheme } = useTheme();
  const classes = useStyles({ currentTheme });
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleProfile = () => setShowProfile(!showProfile);
  const urlUserImage = `${api}/userImages/user_${id}.png`;
  const urlDefaultImage = `${api}/userImages/default.png`;
  const groups = createSidebarSections(role, perms);

  useEffect(() => {
    loadUserImage();
  }, []);

  const loadUserImage = () => {
    setUserImage(urlUserImage);
  };
  const onErrorLoadImage = () => setUserImage(urlDefaultImage);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8}>
        <div className={classes.logo}>
          <img src={Sidebar.NestlePromotionIcon} alt="Nestlé" />
        </div>
      </Grid>
      <Grid item xs={4} className={classes.userSection}>
        <div className={classes.userCard}>
          <div>
            <p className={classes.userName}>{userName}</p>
          </div>
          <div className={classes.buttons}>
            <Button className={classes.smallButton}>
              <img src={Images.NotificationIcon} alt="Notifications" />
            </Button>
            <Button className={classes.smallButton} onClick={props.onLogout}>
              <img src={Images.LogoutIcon} alt="Logout" />
            </Button>
          </div>
        </div>
        <Button className={classes.userButton} onClick={toggleProfile}>
          <div className={classes.userImage}>
            <img src={userData.image_url !== undefined ? profileImage : UserDrawer} onError={onErrorLoadImage} alt="User" />
          </div>
        </Button>
        <Button onClick={toggleMenu}>
          <img src={Images.MenuIcon} alt="Menu" />
        </Button>
      </Grid>
      <Menu groups={groups} onClose={toggleMenu} visible={showMenu} />
      <Profile visible={showProfile} onClose={toggleProfile} />
    </Grid>
  );
};

export default AppSidebar;
