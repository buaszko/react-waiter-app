export const getAllTables = state => state.tables;
export const getTableId = ({ tables }, tableId) => tables.find(table => table.id === tableId);

const createActionName = name => `app/tables/${name}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES')
const EDIT_TABLE = createActionName('EDIT_TABLE')

export const updateTables = payload => ({ type: UPDATE_TABLES, payload }) ;
export const editTable = payload => ({ type: EDIT_TABLE, payload });

export const API_URL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3131/api";

export const fetchTables = () => {
  return (dispatch) => {
    fetch(API_URL + "/tables")
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
    };
};
export const updateSingleTable = tableData => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        status: tableData.status,
        peopleAmount: tableData.peopleAmount,
        maxPeopleAmount: tableData.maxPeopleAmount,
        bill: tableData.bill
      })
    };

    fetch(API_URL + "/tables", options)
      .then(() => dispatch(editTable(tableData)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_TABLES:
      return [...action.payload] 
      
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table)
    default:
      return statePart;
  }
};

export default tablesReducer;