const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    login: state.login,
    infoList: state.infoList
  }
}

const mapDisptchToProps = (dispatch) => {
  return {
    onLogin: (user) => {
      dispatch({
        type: 'LOGIN',
        userInfo: user
      })
    }
  }
}

export {
  mapStateToProps,
  mapDisptchToProps
}