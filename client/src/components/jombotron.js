import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

function Jombotron() {
    return (
        <div>
            <Jumbotron>
                <Container>
                    <h1 className="display-5">Hello User!</h1>
                    <p className="lead">"The only thing that you absolutely have to know, is the location of the library."<br/> -Albert Einstein </p>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Jombotron;