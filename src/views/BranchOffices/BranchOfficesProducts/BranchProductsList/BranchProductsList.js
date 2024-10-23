import React, { useState } from 'react';
import { useStyles } from './BranchProductsListStyles';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import Table from 'components/Table';
import { useTable } from 'hooks/useTableV2';
import { ContentRelocator } from 'components/ContentRelocator';
import { messages } from './BranchOfficesProductsMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import FilterModal from 'components/FilterModal';
import { useHistory } from 'react-router-dom';
import { BranchProductForm } from '../BranchProductForm';
import { useTheme } from 'hooks/useTheme';

export const BranchProductsList = (props) => {
  const { currentTheme } = useTheme();
  const branch_id = props.match.params.id
  const msgs = useIntlMessages(messages);
  const {
    onChangeSearchItem,
    onChangeSize,
    onChangePage,
    totalFound,
    page,
    pageSize,
    searchItem,
    items,
    search,
    resetFilters,
    setOrderBy,
    extraParams,
    setExtraParams
  } = useTable({ endpoint: `/branch/${branch_id}/product/` });
  const classes = useStyles({ currentTheme });
  const history = useHistory();
  const [selectedItem, setSelectedItem] = useState(0);
  const [showReadModal, setShowReadModal] = useState(false);
  const toggleReadModal = () => setShowReadModal(!showReadModal);

  const redirectList = () => history.push('/branch-offices/list');

  const handleAcceptEdit = () => {
    setShowReadModal(false);
    setSelectedItem(0);
    search();
  };

  const readModal = (id) => {
    // open drawer
    setSelectedItem(id);
    setShowReadModal(true);
  };

  return (
    <div>
      <NestcaPageHeader
        title={msgs.pageTitle}
        onChangeSearchItem={onChangeSearchItem}
        searchItem={searchItem}
        Icon={currentTheme.themeDark ? Pages.BranchOfficesPageIconDark : Pages.BranchOfficesPageIcon}
        count={totalFound}
        showGoBack={true}
        goBack={redirectList}
      />
      <BranchProductForm
        visible={showReadModal}
        onClose={toggleReadModal}
        onAccept={handleAcceptEdit}
        branchOfficeId={branch_id}
        branchProductId={selectedItem}
      />
      <ContentRelocator>
        <div className={classes.infoContainer}>
          <p className={classes.text}>{msgs.pageDescription}</p>
        </div>
        <Table
          total={totalFound}
          page={page}
          pageSize={pageSize}
          onChangeSize={onChangeSize}
          onChangePage={onChangePage}
        >
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>{msgs.tableColumnName}</th>
              <th>{msgs.tableColumnUnits}</th>
              <th>{msgs.tableColumnDivision}</th>
              <th>{msgs.tableColumnCategory}</th>
              <th>{msgs.tableColumnMaterialGroup}</th>
              <th>{msgs.tableColumnFormat}</th>
              <th>{msgs.tableColumnSKU}</th>
              <th>{msgs.tableColumnSAP}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} onClick={()=>{readModal(item.id)}} style={{cursor:"pointer"}}>
                <td style={{textAlign:'left'}}>{item.name}</td>
                <td>{item.unit_type.join(" / ")}</td>
                <td>{item.division_name}</td>
                <td>{item.category_name}</td>
                <td>{item.material_group_name}</td>
                <td>{item.format_equivalence}</td>
                <td>{item.sku}</td>
                <td>{item.code_sap}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentRelocator>
    </div>
  );
};
