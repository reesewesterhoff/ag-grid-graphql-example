import {Grid} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('Evaluation_License_Not_For_Production_Valid_Until24_February_2019__MTU1MDk2NjQwMDAwMA==2a13f551f10460bf5d031412d8f94167');

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import ServerSideDatasource from './ServerSideDatasource'

const columnDefs = [
  {field: 'athlete'},
  {field: 'country', enableRowGroup: true, rowGroup: true, hide: true},
  {field: 'sport', enableRowGroup: true, rowGroup: true, hide: true},
  {field: 'year'},
  {field: 'age'},
  {field: 'gold', type: 'valueColumn'},
  {field: 'silver', type: 'valueColumn'},
  {field: 'bronze', type: 'valueColumn'},
];

const gridOptions = {
  columnDefs,

  // use the server-side row model
  rowModelType: 'serverSide',

  // fetch 100 rows per at a time
  cacheBlockSize: 200,

  // only keep 10 blocks of rows
  maxBlocksInCache: 10,

  sideBar: true,

  enableColResize: true,
  enableSorting: true,
  enableFilter: true,

  columnTypes: {
    dimension: {
      enableRowGroup: true,
      enablePivot: true,
    },
    valueColumn: {
      width: 150,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      allowedAggFuncs: ['avg','sum','min','max']
    }
  },
};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

const datasource = new ServerSideDatasource(gridOptions);
gridOptions.api.setServerSideDatasource(datasource);