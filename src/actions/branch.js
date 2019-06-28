const mapStateToProps = (state) => {
  return {
    branchList: state.branchList,
    searchResult: state.searchResult,
    branchStat: state.branchStat
  }
}

const mapDisptchToProps = (dispatch) => {
  return {
    onAdd: (branch) => {
      dispatch({
        type: 'ADD_BRANCH',
        branch: branch
      })
    },
    onDelete: (index) => {
      dispatch({
        type: 'DELETE_BRANCH',
        index: index
      })
    },
    onChange: (index, branch) => {
      dispatch({
        type: 'CHANEG_BRANCH',
        index: index,
        branch: branch
      })
    },
    onSearch: (text) => {
      dispatch({
        type: 'SEARCH_BRANCH',
        text: text
      })
    },
    onLoad: () => {
      dispatch({
        type: 'LOAD_MORE'
      })
    }
  }
}

export {
  mapStateToProps,
  mapDisptchToProps
}