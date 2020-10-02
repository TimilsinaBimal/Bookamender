import React, {Component} from 'react';
import AppNavBar from './AppNavBar';
import {getBooks} from '../actions/bookActions';
import {PropTypes} from 'prop-types'; 
import { connect } from 'react-redux';
import Slides from "./slides";

class Home extends Component {
  static propTypes ={
    book: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.getBooks();
  }

  render(){
    const {books} = this.props.book;
    return (
        <div>
          <AppNavBar/>
          <div className="container">
            <div className="container">
            <Slides/>
            </div>
        
          
          {/* <img className="container-fluid" alt="background-img" src="https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" /> */}
      
          
          <div className="row mt-5">
             <div className="col mt-2">
             <h2 className="mb-3">New Arrivals</h2>
             { books.slice(0,5).map(({original_title, authors}) =>(
                <div class="shadow p-3 mb-5 bg-white rounded"><h5>{original_title}</h5>{authors}</div>
             ))}
          </div>
          </div>
          
        </div>
          
          </div>
          
        
        
    )
}
}
const mapStateToProps = (state) => ({
  book: state.book
})
export default connect(mapStateToProps, {getBooks})(Home);
