const chzBankReducer = (state, action) => {
  if (!state || action.type === 'INIT') {
    return {
      debugData: [
        { id: '1', name: 'Microsoft', sum: 2000 },
        { id: '2', name: 'Huawei', sum: 1800 },
        { id: '3', name: 'Google', sum: 1500 },
      ],
      login: false,
      users: [
        { userId: 'root', password: 'root' }
      ]
    }
  }

  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        debugData: [...state.debugData, action.data]
      }
    case 'DELETE_DATA':
      return {
        ...state,
        debugData: [...state.debugData.splice(action.index, 1)]
      }
    case 'SET_RESULT':
      return {
        ...state,
        resultList: action.resultList,
        allResultList: [['Null']]
      }
    default:
      return state
  }
};

export default chzBankReducer;