import React from 'react'
import { Button } from 'reactstrap';

import './home.css'
import Analyze from "./analyze";

class BookDisplay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            book: props.book,
            expand: true,
            text: '',
            loading: false,
            analyze: '',
        }
    }


    async analyze() {
        this.setState({analyze: !this.state.analyze})
    }

    render() {
        let book = this.state.book;
        return (
            <div className={'wrapper'}>
                <h3>{book.title}</h3>
                {book.authors.map( (author,index) =>  <p key={index}>{author.name}</p>)}
                <Button outline color={'primary'} onClick={ x => this.analyze()}> Analyze Text </Button>
                {'  '}
                {'  '}
                <Button outline color={'primary'} href={`http://www.gutenberg.org/files/${this.state.book.id}`} target="_blank"> See Text </Button>
                <br/>
                <br/>
                {this.state.loading ?  <p> Loading... </p> : null}
                {this.state.expand ? <p>{this.state.text.substring(0,1000)}</p> : null}
                {this.state.analyze?
                    <Analyze id={book.id}></Analyze>
                    : null}
            </div>
        );
    }
}

export default BookDisplay;
