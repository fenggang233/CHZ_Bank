const chzBankReducer = (state, action) => {
  if (!state || action.type === 'INIT') {
    return {
      login: false,
      infoList: []
    }
  }

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        login: true,
        userInfo: action.userInfo,
        infoList: [
          {
            uid: '1', name: '有新业务要处理', status: 'done',
          },
          {
            uid: '2', name: '赶紧去领取本月工资', status: 'done',
          },
        ]
      }
    case 'ADD':
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