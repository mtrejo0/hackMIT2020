import React from 'react'
import './home.css'
import { PieChart } from 'react-minimal-pie-chart';

class Analyze extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        // image
        // text | console | green | sentiment analysis
        // sentiment analysis
        // pie chart - number of nouns, adj, adverbs
        // lexical diversity

        let book =
                {'mcw': [(',', 10040), ('.', 4833), ('and', 4485), ('the', 4457), ('I', 4076), ('to', 3529), ("'", 2786), ('of', 2321), ('a', 2314), (';', 1895)],
                'sentiment': {'neg': 0.072, 'neu': 0.859, 'pos': 0.069, 'compound': -0.8426},
                    'sent': 'neg',
                    'num-words': 145743,
                    'lex-div': null,
                    'pie': {'NN': 0.16415882752516417, 'ADJ': 0.0504037929780504, 'VB': 0.17185044907817185, 'ADV': 0.056311452351056314, 'OTHER': 0.44272452193244277},
                    'pic': 'https://api.deepai.org/job-view-file/5594bcd3-0854-44b9-a0b0-acf24d94075e/outputs/output.jpg'}

                    
        return (

            <div>
                <img src={book.pic}/>
                <h1>Most Common Words</h1>
                <p>{JSON.stringify(book.mcw)}</p>

                <h1>Sentiment</h1>
                <p>Overall: {book.sent}</p>
                <p>Breakdown:</p>
                <p>{JSON.stringify(book.sentiment)}</p>

                <h1>Lexical Diversity</h1>
                <PieChart
                    style={{
                        fontSize: '4px',
                    }}
                    data={[
                        { title: 'NN', value: book.pie.NN, color: '#80E8FF' },
                        { title: 'ADJ', value: book.pie.ADJ, color: '#8099FF' },
                        { title: 'VB', value: book.pie.VB, color: '#FFFF70' },
                        { title: 'ADV', value: book.pie.ADV, color: '#80E8FF' },
                        { title: 'OTHER', value: book.pie.OTHER, color: '#8099FF' },
                    ]}
                    label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                    style={{width:'80%'}}
                />
                <br/>
                <br/>
                <br/>

            </div>
        );
    }
}

export default Analyze;
