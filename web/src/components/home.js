import React from 'react'
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
        try {
            const baseURL = 'http://gutendex.com';
            let queryURL = baseURL + '/books?search='
            queryURL += this.state.search;
            console.log(encodeURI(queryURL))
            const response = await fetch(encodeURI(queryURL));
            let responseJson = await response.json();
            console.log(responseJson)
            this.setState({...this.state,books: responseJson.results,loading: false})
        } catch (error) {
            console.log(error)
            this.setState({...this.state,loading: false})
        }
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
                            console.log(book)
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
