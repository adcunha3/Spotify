import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import './Song.css';

function Song(props) {

  return (
    <div>
        <Link to={'/' + props.track}>
        <li className="table-row">
            <div className="col col-1" data-label="Job Id">{props.name}</div>
            <div className="col col-2" data-label="Customer Name">+</div>
        </li>
        </Link>
    </div>
  );
}

export default Song;
