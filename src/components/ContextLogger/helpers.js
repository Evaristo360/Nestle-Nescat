/* eslint-disable no-console */
import _ from 'lodash';

const getObjectDiff = (a, b) =>
  _.fromPairs(_.differenceWith(_.toPairs(a), _.toPairs(b), _.isEqual));

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
  .matches;
const consoleTheme = prefersDarkMode ? 'dark' : 'light';

const textStyleByTheme = {
  dark: `font-size: 12px; padding: 4px; border-radius: 2px; color: #9EDFF7;`,
  light: `font-size: 12px; padding: 4px; border-radius: 2px; color: #142179;`
};

const textStyle = textStyleByTheme[consoleTheme];

const textBodyStyleByTheme = {
  dark: 'background-color: transparent; text-decoration: none; color: #D48A67;',
  light: 'background-color: transparent; text-decoration: none; color: #A31710;'
};

const textBodyStyle = textBodyStyleByTheme[consoleTheme];

const consoleThemeStyles = {
  dark: {
    groupTitleNameStyle: `${textStyle} color: #579BD4;`,
    groupTitleDateStyle: `${textStyle} color: #4AAADC;`,
    keyNameStyle: `${textStyle}`,
    arrowStyle: `${textStyle} color: #579BD4; margin: 0 4px`,
    prevStateStyle: `${textStyle} background-color: rgba(139, 40, 40, 0.5); text-decoration: line-through; color: #c5c5c5;`,
    newStateStyle: `${textStyle} background-color: rgba(70, 165, 70, 0.4); color: #e2e2e2;`
  },
  light: {
    groupTitleNameStyle: `${textStyle} color: #0A69BC;`,
    groupTitleDateStyle: `${textStyle}`,
    keyNameStyle: `${textStyle}`,
    arrowStyle: `${textStyle} color: rgb(0, 156, 196);`,
    prevStateStyle: `${textStyle} background-color: rgba(160, 10, 10, 0.4); text-decoration: line-through; color: black;`,
    newStateStyle: `${textStyle} background-color: rgba(24, 149, 20, 0.3); color: black;`
  }
};

const {
  keyNameStyle,
  arrowStyle,
  prevStateStyle,
  newStateStyle,
  groupTitleNameStyle,
  groupTitleDateStyle
} = consoleThemeStyles[consoleTheme];

function printValue({ key, prevValue, newValue, hasDiff, isGroup }) {
  const consoleHandler = isGroup ? console.groupCollapsed : console.log;

  if (hasDiff) {
    consoleHandler(
      '%c%s%c%s%c%s%c%s',
      keyNameStyle,
      `${key}:`,
      prevStateStyle +
        (!hasDiff
          ? 'background-color: transparent; text-decoration: none;'
          : ''),
      prevValue,
      arrowStyle,
      '=>',
      newStateStyle + (!hasDiff ? 'background-color: transparent;' : ''),
      newValue
    );
  } else {
    consoleHandler(
      '%c%s%c%s',
      keyNameStyle,
      `${key}:`,
      prevStateStyle + (!hasDiff ? textBodyStyle : ''),
      prevValue
    );
  }
}

function printGroupHeader({ name }) {
  // console.log('\n');
  console.group(
    `%c%s%c%s`,
    groupTitleNameStyle,
    name,
    groupTitleDateStyle,
    new Date().toLocaleString()
  );
}

function logDiffs({
  name = '',
  prevState = {},
  newState = {},
  printSeparator = true,
  config = { arrayDiffs: true, objectDiffs: true }
}) {
  const keys = _.keys(prevState);

  if (printSeparator) printGroupHeader({ name, isMain: true });

  _.forEach(keys, (key) => {
    let prevValue = prevState[key];
    const newValue = newState[key];
    const hasDiff = prevValue !== newValue;

    if (_.isNull(prevValue)) prevValue = newValue;

    if (_.isFunction(newValue)) return;

    if (_.isArray(newValue) || _.isObject(newValue)) {
      printValue({
        key,
        prevValue,
        newValue,
        hasDiff,
        isGroup: true
      });

      let prevValueParsed = prevValue;

      if (_.isArray(newValue)) {
        prevValueParsed = config.arrayDiffs ? prevValue : newValue;
      } else if (_.isObject(newValue)) {
        prevValueParsed = config.objectDiffs ? prevValue : newValue;
      }

      logDiffs({
        name: key,
        prevState: prevValueParsed,
        newState: newValue,
        printSeparator: false,
        config,
        isGroup: true
      });
      console.groupEnd();

      return;
    }

    printValue({ key, prevValue, newValue, hasDiff });
  });

  if (printSeparator) console.groupEnd();
}

export { logDiffs, getObjectDiff };
