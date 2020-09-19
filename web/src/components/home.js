import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    async componentDidMount() {
        try {
            const baseURL = 'https://openlibrary.org/';
            let queryURL = baseURL + "search.json?q=" ;
            queryURL += 'Pride and Prejudice'
            const response = await fetch(queryURL);
            let responseJson = await response.json();
            this.setState({...this.state,books: responseJson.docs})
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div style={{padding:'32px'}}>
                <Input onChange={ x => console.log(x)}></Input>
                {this.state.books.map( book => {
                    console.log(book);
                    return (
                        <div>
                            <p>{book.title}</p>
                        </div>);
                })}
            </div>
        );
    }
}

export default Home;
