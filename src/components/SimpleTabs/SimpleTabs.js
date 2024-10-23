import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { style } from './SimpleTabsStyles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from 'hooks/useTheme';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const SimpleTabs = ({ tabs, content, onChangeTab }) => {
  const { currentTheme, mode } = useTheme();

  const classes = style();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    onChangeTab(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabs.map((t, i) => (
            <Tab key={i} label={t} {...a11yProps(i)} />
          ))}
          {/* <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      {content.map((c, i) => (
        <TabPanel key={i} value={value} index={i}>
          {c}
        </TabPanel>
      ))}
      {/* <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
};

export default SimpleTabs;
