const mapStateToProps = (state) => {
  return {
    users: state.users,
    login: state.login
  }
}

const mapDisptchToProps = (dispatch) => {
  return {
    onSubmit: (user) => {
      dispatch({
        type: 'ADD_USER',
        user: user
      })
    },
    onDelete: (index) => {
      dispatch({
        type: 'DELETE_USER',
        index: index
      })
    },
    onLogIn: (userId) => {
      dispatch({
        type: 'LOG_IN',
        userId: userId
      })
    }
  }
}

export {
  mapStateToProps,
  mapDisptchToProps
}