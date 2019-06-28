import { connect } from 'react-redux'
import BranchPage from '../components/Branch/BranchPage';
import { mapStateToProps, mapDisptchToProps } from '../actions/branch';

const newBranchPage = connect(mapStateToProps, mapDisptchToProps)(BranchPage);

export default newBranchPage;