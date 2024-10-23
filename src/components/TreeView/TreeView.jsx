import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import TreeViewMaterialUI from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import { CollapseAnimated } from './CollapseAnimated';
import { treeItemWithStyles } from './TreeViewStyles';

const StyledTreeItem = treeItemWithStyles((props) => (
  <TreeItem {...props} TransitionComponent={CollapseAnimated} />
));

const TreeView = (props) => {
  const { items, onSelectItem } = props;
  const handleSelectItem = (event, value) => {
    if (onSelectItem) onSelectItem(value);
  };

  const renderTree = (fileList = []) =>
    _.map(fileList, (file) => {
      const { name, childs: fileChilds } = file;

      return _.size(file.childs) > 0 ? (
        <StyledTreeItem key={name} nodeId={name} label={file.name}>
          {renderTree(fileChilds)}
        </StyledTreeItem>
      ) : (
        <StyledTreeItem key={name} nodeId={name} label={file.name} />
      );
    });

  return (
    <TreeViewMaterialUI
      defaultExpanded={['src']}
      defaultCollapseIcon={<FolderOpenOutlinedIcon color="primary" />}
      defaultExpandIcon={<FolderOutlinedIcon />}
      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
      onNodeSelect={handleSelectItem}
    >
      {renderTree(items)}
    </TreeViewMaterialUI>
  );
};

TreeView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      childs: PropTypes.array
    })
  ),
  onSelectItem: PropTypes.func
};

export { TreeView };
