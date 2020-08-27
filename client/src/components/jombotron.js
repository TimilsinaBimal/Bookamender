import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

function Jombotron() {
    return (
        <div>
            <Jumbotron>
                <Container>
                    <h1 className="display-3">Hello User!</h1>
                    <p className="lead">This is an AI powered library manager that recommends you books automatically.</p>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Jombotron;