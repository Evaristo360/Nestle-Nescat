import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, Link } from 'react-router-dom';
import { section } from './MenuSection.css';
import AdvertisementsIcon from './SidebarIcons/AdvertisementsIcon';
import ManagementIcon from './SidebarIcons/ManagementIcon';
import AccountsIcon from './SidebarIcons/AccountsIcon';
import SurveysIcon from './SidebarIcons/SurveysIcon';
import openIcon from '../Images/Sidebar/small-down.svg';
import { useTheme } from 'hooks/useTheme';
import { messages } from '../AppSidebar/AppSidebarMessages';

const MenuSection = (props) => {
  const intl = useIntl();
  const { currentTheme } = useTheme();
  const [stateSection, setStateSection] = useState('deactive');
  const theme = {
    active: {
      bgColor: hexaChangeRGB(currentTheme.button, 0.2),
      color: currentTheme.texts,
      iconColor: currentTheme.titles
    },
    deactive: {
      bgColor: currentTheme.background,
      color: hexaChangeRGB(currentTheme.texts, 0.5),
      iconColor: hexaChangeRGB(currentTheme.texts, 0.5)
    }
  };
  //Getting the location to know if the element has to be iluminated
  const location = useLocation();
  const locationName = location.pathname;

  //Const for managing the icons depending on selected section
  const mainSection = props.content[0];

  //Leaving the subsections alone
  const subSections = props.content.slice(1, props.content.length);

  //For searching on subs urls
  const subSectionsUrls = subSections.map((sub) => sub[1]);

  //Initial default colors
  let Icon = AdvertisementsIcon;
  let secName = '';

  //Initial configurations depending on the name of section
  switch (mainSection) {
    //The sections that have subsections doesn't have url's
    case intl.formatMessage(messages.management):
      Icon = ManagementIcon;
      secName = intl.formatMessage(messages.management);
      break;
    case '/surveys/list':
      Icon = SurveysIcon;
      secName = intl.formatMessage(messages.surveys);
      break;
    case '/clients/list':
      Icon = AccountsIcon;
      secName = intl.formatMessage(messages.accounts);
      break;
    case '/testpage':
      Icon = AccountsIcon;
      secName = intl.formatMessage(messages.test);
      break;
    case intl.formatMessage(messages.advertisement):
      Icon = AdvertisementsIcon;
      secName = intl.formatMessage(messages.advertisement);
      break;
    default:
  }

  //This helps in the case that the user access from url direct to the section
  useEffect(() => {
    if (subSectionsUrls.includes(locationName)) {
      setStateSection('active');
    }
  }, []);

  //States for managing the display of subsections (on the case that the sections has)
  const [subSectionOn, setSubSectionOn] = useState(false);
  const [hideDefSub, setHideDefSub] = useState(false);

  //Function trigered when opening a subsection
  const openSubSection = (open) => {
    setSubSectionOn(!subSectionOn);
    if (open) {
      setStateSection('active');
    } else {
      setStateSection('deactive');
    }
  };

  //Function for managing the hover
  const hoverSection = (hover) => {
    if (hover) {
      setStateSection('active');
    } else {
      //If the subsection is closed remove the hover style, if not let it On
      if (!subSectionOn) {
        setStateSection('deactive');
      }
    }
  };

  //Hover management if the user enters from url
  const hoverSection2 = (hover) => {
    if (hover) {
      setStateSection('active');
    } else {
      //If the subsection is closed remove the hover style, if not let it On
      if (hideDefSub) {
        setStateSection('deactive');
      }
    }
  };

  function hexaChangeRGB(hex, alpha) {
    if (!hex) return `rgb(255,255,255)`;
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  return (
    <li css={section({ currentTheme })}>
      {
        //If the section has subsections, they can trigger an open subsection function, if not, they redirect to a route
        props.content.length > 1 ? (
          //If the user access direct from an url that is a subsection, the section title its iluminated
          subSectionsUrls.includes(locationName) ? (
            <div
              id="titleSection"
              style={{
                backgroundColor: theme[stateSection].bgColor,
                color: theme[stateSection].color
              }}
              onMouseOver={() => hoverSection2(true)}
              onMouseOut={() => hoverSection2(false)}
              onKeyUp={() => {}}
              onBlur={() => {}}
              onFocus={() => {}}
              onClick={() => {
                setHideDefSub(!hideDefSub);
                openSubSection(hideDefSub);
              }}
              role="button"
              tabIndex={0}
            >
              <Icon color={theme[stateSection].iconColor} />
              <div id="main">{secName}</div>
              <img id="downIcon" src={openIcon} alt="open" />
            </div>
          ) : (
            <div
              id="titleSection"
              style={{
                backgroundColor: theme[stateSection].bgColor,
                color: theme[stateSection].color
              }}
              onMouseOver={() => hoverSection(true)}
              onMouseOut={() => hoverSection(false)}
              onBlur={() => {}}
              onFocus={() => {}}
              onClick={() => openSubSection(!subSectionOn)}
              onKeyUp={() => {}}
              role="button"
              styling="link"
              tabIndex={0}
            >
              <Icon color={theme[stateSection].iconColor} />
              <div id="main">{secName}</div>
              <img id="downIcon" src={openIcon} alt="open" />
            </div>
          )
        ) : //If the element doesn't have subsections
        locationName === mainSection ? (
          //If the name of the section is the same than the route,this it is colorized
          <Link
            className="link-active button-active"
            to={props.content[0]}
            id="titleSection"
            style={{
              color: currentTheme.texts
            }}
            onMouseOver={() => hoverSection(true)}
            onMouseOut={() => hoverSection(false)}
          >
            <Icon color={currentTheme.titles} />
            <div id="main">{secName}</div>
          </Link>
        ) : (
          //Diferent name section than route, default off styles
          <Link
            className="section"
            to={props.content[0]}
            id="titleSection"
            style={{
              backgroundColor: theme[stateSection].bgColor,
              color: theme[stateSection].color
            }}
            onMouseOver={() => hoverSection(true)}
            onMouseOut={() => hoverSection(false)}
          >
            <Icon color={theme[stateSection].iconColor} />
            <div id="main">{secName}</div>
          </Link>
        )
      }

      {/* If the opened page (url) is a subsection the section where it belongs is opened and
            the subsection is colorized */}
      {subSectionsUrls.includes(locationName) ? (
        <div id="subSection" style={{ display: hideDefSub ? 'none' : 'block' }}>
          <ul>
            {subSections.map((e) =>
              locationName === e[1] ? (
                <li id="subSections" key={e} className="button-active">
                  <Link style={{ opacity: 1 }} to={e[1]}>
                    {e[0]}
                  </Link>
                </li>
              ) : (
                <li id="subSections" key={e}>
                  <Link to={e[1]}>{e[0]}</Link>
                </li>
              )
            )}
          </ul>
        </div>
      ) : /*If the url name is diferent that the subsection the subSectionOn state verifies if
            the user have opened that subsection */
      subSectionOn ? (
        <div id="subSection">
          <ul>
            {subSections.map((e) =>
              locationName === e[1] ? (
                <li id="subSections" key={e}>
                  <Link style={{ opacity: 1 }} to={e[1]}>
                    {e[0]}
                  </Link>
                </li>
              ) : (
                <li id="subSections" key={e}>
                  <Link to={e[1]}>{e[0]}</Link>
                </li>
              )
            )}
          </ul>
        </div>
      ) : null}
    </li>
  );
};

export default MenuSection;
