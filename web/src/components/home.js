import React from 'react'
import axios from 'axios';

import { Input, Button } from 'reactstrap';
import BookDisplay from "./bookDisplay";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: '',
            loading: false
        }
    }

    async fetchBooks(){
        this.setState({...this.state,loading: true})
        const baseURL = 'https://gutendex.com';
        let queryURL = baseURL + '/books?search='
        queryURL += this.state.search;
        axios.get(queryURL)
        .then(res => {
            this.setState({...this.state, books: res.data.results,loading: false})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div style={{padding:'32px'}} className={'back'}>
                <div className={'input'}>
                    <Input type="text" onChange={
                        event => {
                            this.state.search = event.target.value;
                        }}
                        />
                    {''}
                    <Button color="primary" onClick={event => this.fetchBooks()}>Submit</Button>
                </div>
                {
                    this.state.loading ? <p> Loading... </p> :
                    this.state.books.map( (book,index) => {
                        return (
                            <div key={index}>
                                <BookDisplay book={book}/>
                            </div>);
                    })
                }
            </div>
        );
    }
}

export default Home;
