import { Grid, Drawer, TextField } from '@material-ui/core';
import { useStyles } from './styles/DrawerModalStyles.css';
import Button from 'components/Button';
import { useTheme } from 'hooks/useTheme';

const DrawerModal = ({
  visible,
  onClose,
  title = 'default title',
  onAccept,
  children,
  disabledAccept = false,
  className,
  useScroll = false,
  showButtonCancel = true,
  onDelete,
  showButtonDelete = false,
  showButtonAccept = true,
}) => {
  const { currentTheme } = useTheme();
  const classes = useStyles({ currentTheme, useScroll });

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={`${classes.root} ${className}`}
    >
      <div className={classes.contentDrawer}>
        <h1 className={classes.title}>{title}</h1>
        {children}
      </div>

      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{
          position: 'absolute',
          bottom: '2rem',
          width: '100%',
          padding: '.5rem 3rem'
        }}
      >
        <div style={{ width: '100%' }}>
          {showButtonAccept ? (
            <Button
              style={{ background: '#007CBA' }}
              disabled={!disabledAccept}
              onClick={(e) => onAccept(e)}
            >
              Aceptar
            </Button>
          ) : null}
          {showButtonCancel ? (
            <Button
              onClick={onClose}
              style={{ marginLeft: '1rem', background: '#1C1C1C' }}
            >
              Cancelar
            </Button>
          ) : null}
          {showButtonDelete ? (
            <Button
              onClick={onDelete}
              style={{ marginLeft: '1rem', background: '#d10b15' }}
            >
              Eliminar
            </Button>
          ) : null}
        </div>
      </Grid>
    </Drawer>
  );
};

export default DrawerModal;
