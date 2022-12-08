import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import firebaseApp from '../../firebase/firebase';
import './Song.css';

function Song(props) {

    const playlist_id = props.id;
    const song_id = props.track;

    const [user, setUser] = useState('');

    useEffect(() => {
        var user_email = firebaseApp.auth().currentUser.email;
        console.log(user_email);
    
        axios.post('http://localhost:3001/api/users/login', {email: user_email}).then((res) => {
          console.log(res.data._id);
          setUser(res.data._id);
        })
    }, [])

    const delete_song = async () => {
        axios.delete('http://local:3001/api/songs/remove-song', {user, playlist_id, song_id}).then((res) => {
            console.log(res);
        })
    }

  return (
    <div>
        <Link>
        <li className="table-row">
            <div className="col col-1" data-label="Job Id">{props.name}</div>
            <div className="col col-2" data-label="Customer Name">+</div>
        </li>
        </Link>
    </div>
  );
}

export default Song;
