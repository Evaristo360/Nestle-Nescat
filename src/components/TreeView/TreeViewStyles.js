import { fade, withStyles } from '@material-ui/core/styles';

const treeItemWithStyles = (Component) =>
  withStyles((theme) => ({
    content: {
      minHeight: theme.spacing(4)
    },
    iconContainer: {
      '& .close': {
        opacity: 0.3
      }
    },
    group: {
      marginLeft: 12,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
    }
  }))(Component);

export { treeItemWithStyles };
