import { connect } from 'react-redux'
import LayoutPage from '../layouts/LayoutPage';
import { mapStateToProps, mapDisptchToProps } from '../actions/layout';

const newLayoutPage = connect(mapStateToProps, mapDisptchToProps)(LayoutPage);

export default newLayoutPage;