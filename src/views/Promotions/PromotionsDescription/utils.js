import { makeStyles } from "@material-ui/core/styles";

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300
  },
  indeterminateColor: {
    color: "#000000"
  },
  selectAllText: {
    fontWeight: 500,
    '& .MuiCheckbox-colorSecondary.Mui-checked':{
        color: '#007CBA !important',
      },
  },
  selectedAll: {
    '& .MuiCheckbox-colorSecondary.Mui-checked':{
        color: '#007CBA !important',
      },
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

const options = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

export { useStyles2, MenuProps, options };