import React from 'react';
import {Dimmer, Loader} from "semantic-ui-react";

function Spinner() {
    return (
        <Dimmer active>
            <Loader content="loading rooms & messages"/>
        </Dimmer>
    );
}

export default Spinner;