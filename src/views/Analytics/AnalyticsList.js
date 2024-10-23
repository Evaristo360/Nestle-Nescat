import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { useTheme } from 'hooks/useTheme';
import { AnalyticsItem } from './components/AnalyticsItem/AnalyticsItem';
import useAxios from 'hooks/useAxios';
import DateRangePersonalized from 'components/Inputs/ListFiltersInputs/DateRangePersonalized';
import { SingleOption } from './components/SingleOption/SingleOption';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import { Styles } from './AnalyticsStyle.css';
import { useTable } from 'hooks/useTableV2';
import Table from 'components/Table';
import { ContentRelocator } from 'components/ContentRelocator';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import { SelectV2, createOption } from 'components/SelectV2';

export const AnalyticsList = () => {
  const { currentTheme } = useTheme();
  const screenTable = useTable({ endpoint: '/screen' });
  const campaignHistoryTable = useTable({ endpoint: '/campaign/history' });
  const { get } = useAxios();
  const [graphsLoading, setGraphsLoading] = useState(true);
  const [graph1, setGraph1] = useState({
    items: [],
    totalFound: 0,
    totalTime: 0
  });
  const [graph2, setGraph2] = useState({
    items: [],
    totalFound: 0,
    totalTime: 0
  });
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    loadGraphs();
  }, []);

  useEffect(() => {
    if (!campaignHistoryTable.loading) {
      let start_date = lodash.get(selectionRange, '[0].startDate', null);
      let end_date = lodash.get(selectionRange, '[0].endDate', null);
      if (start_date && end_date) {
        campaignHistoryTable.addExtraParams({
          start_date: start_date.toISOString(),
          end_date: end_date.toISOString()
        });
      }
    }
  }, [selectionRange]);

  const loadGraphs = async (screen_id = -1) => {
    try {
      const params = {};
      if(screen_id >= 0)
        params.screen_id = screen_id;
      setGraphsLoading(true);
      const response = await get(`/campaign/graphs`, { params });
      setGraph1(response.data.result.graphs[0]);
      setGraph2(response.data.result.graphs[1]);
    } catch (error) {
      console.log({ error });
    } finally {
      setGraphsLoading(false);
    }
  };

  async function restoreFilters() {
    campaignHistoryTable.resetFilters();
    setSelectionRange([
      {
        startDate: new Date('2020,12,01'),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
    loadGraphs();
  }

  const screenOptions = screenTable.items.map((screen) =>
    createOption(screen.name, screen.id)
  );

  const onChangeScreenId = (event) => {
    const screen_id = event.target.value;
    campaignHistoryTable.addExtraParams({
      screen_id
    });
    loadGraphs(screen_id);
  };

  return (
    <>
      <NestcaPageHeader
        title="Analytics:"
        onChangeSearchItem={null}
        Icon={
          currentTheme.themeDark
            ? Pages.ProgramEventPageIconDark
            : Pages.ProgramEventPageIcon
        }
        count={null}
        marginTop="mt-2"
      />
      <ContentRelocator>
        {campaignHistoryTable.loading || graphsLoading ? null : (
          <div css={Styles}>
            <div id="headSection">
              <div id="leftTop">
                <p id="filterText">
                  <FormattedMessage {...messages.filterText} />
                </p>
                <p id="dateText">
                  <FormattedMessage {...messages.filterDate} />{' '}
                </p>
                <DateRangePersonalized
                  id="dataRange"
                  selectionRange={selectionRange}
                  setSelectionRange={setSelectionRange}
                />
              </div>
              <div id="rightTop">
                <SelectV2
                  id="select-screen"
                  label="Pantalla"
                  value={campaignHistoryTable.extraParams.screen_id || ''}
                  onChange={onChangeScreenId}
                  options={screenOptions}
                />
                <div
                  id="restoreButton"
                  className="buttonClass filterButton"
                  onClick={restoreFilters}
                >
                  <FormattedMessage {...messages.restore} />
                </div>
              </div>
            </div>

            <div id="center">
              <div id="graphs">
                <SingleOption
                  data={graph1.items}
                  totalFound={graph1.totalFound}
                  type={'text'}
                  colors={[
                    '#858997',
                    '#009FDA',
                    '#FF5E00',
                    '#E65400',
                    '#802F00',
                    '#541F00',
                    '#401700',
                    '#FFE600',
                    '#E6CF00',
                    '#807300',
                    '#544C00',
                    '#403900'
                  ]}
                />
                <SingleOption
                  data={graph2.items}
                  totalFound={graph2.totalFound}
                  totalTime={graph2.totalTime}
                  colors={[
                    '#C9DD03',
                    '#C7C2BA',
                    '#E65400',
                    '#802F00',
                    '#541F00',
                    '#401700',
                    '#FFE600',
                    '#E6CF00',
                    '#807300',
                    '#544C00',
                    '#403900'
                  ]}
                />
              </div>
              <div id="table">
                <h3>
                  <FormattedMessage {...messages.historial} />
                </h3>
                <div id="listSection">
                  <Table
                    total={campaignHistoryTable.totalFound}
                    page={campaignHistoryTable.page}
                    pageSize={campaignHistoryTable.pageSize}
                    onChangeSize={campaignHistoryTable.onChangeSize}
                    onChangePage={campaignHistoryTable.onChangePage}
                  >
                    <thead>
                      <tr>
                        <th>
                          <FormattedMessage {...messages.screenName} />
                        </th>
                        <th>
                          <FormattedMessage {...messages.campaignName} />
                        </th>
                        <th>
                          <FormattedMessage {...messages.plays} />
                        </th>
                        <th>
                          <FormattedMessage {...messages.totalTime} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignHistoryTable.items.map((e, index) => (
                        <AnalyticsItem properties={e} key={index} />
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContentRelocator>
    </>
  );
};
