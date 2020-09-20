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
    async fetchText(){
        if(this.state.text !== ''){
            this.setState({...this.state,expand: !this.state.expand})
            return;
        }
        this.setState({...this.state,loading: true})
        try {
            const baseURL = 'https://cors-anywhere.herokuapp.com/https://www.gutenberg.org';
            let queryURL = baseURL + '/files/'
            let id = this.state.book.id
            queryURL += `${id}/${id}.txt`;

            let that = this;
            await fetch(encodeURI(queryURL))
                .then(function(response) {
                    return response.text();
                })
                .then(function(data) {
                    that.setState({text: data, loading: false})
                });
        } catch (error) {
            this.setState({...this.state,loading: false})
        }
    }

    async analyze() {
        this.setState({analyze: false})
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
                <Button outline color={'primary'} onClick={ x => this.fetchText()}> See Text </Button>
                <br/>
                <br/>
                {this.state.loading ?  <p> Loading... </p> : null}
                {this.state.expand ? <p>{this.state.text.substring(0,1000)}</p> : null}
                {this.state.analyze !== '' ?
                    <Analyze id={book.id}></Analyze>
                    : null}


            </div>
        );
    }
}

export default BookDisplay;
