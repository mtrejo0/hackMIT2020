import React from 'react'
import { Button } from 'reactstrap';
class BookDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: props.book,
            expand: true,
            text: '',
            loading: false
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
            console.log(error)
            this.setState({...this.state,loading: false})
        }
    }

    render() {
        let book = this.state.book;
        return (
            <div>
                <p>{book.title}</p>
                <p>{book.id}</p>
                {book.authors.map( (author,index) =>  <p key={index}>{author.name}</p>)}
                <Button onClick={ x => this.fetchText()}> See Text </Button>
                {this.state.loading ?  <p> Loading... </p> : null}
                {this.state.expand ? <p>{this.state.text.substring(0,1000)}</p> : null}
                <p>---</p>
            </div>
        );
    }
}

export default BookDisplay;
