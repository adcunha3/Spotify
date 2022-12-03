import React, { useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import firebaseApp from '../firebase/firebase';
import useFetch from 'react-fetch-hook';

function CreateArea() {

    const [playlist, setPlaylist] = useState({
        name: '',
        desc: ''
    });
    
    const [user, setUser] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
    
        setPlaylist(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }

    useEffect(() => {
      
        var user_email = firebaseApp.auth().currentUser.email;
        console.log(user_email);
    
        axios.post('http://localhost:3001/api/users/login', {email: user_email}).then((res) => {
          console.log(res.data._id);
          setUser(res.data._id);
        })
      
    }, [])

    const create_playlist = async () => {
        axios.post('http://localhost:3001/api/playlists/create', {user: user, name: playlist.name, desc: playlist.desc}).then((res) => {
            console.log(res);
        })
    }

    const display_playlist = async () => {
      axios.post('http://localhost:3001/api/playlists/favourite', {user: user}).then((res) => {
        console.log(res)
      })
    }

    return (
      <div>

        <div>
            <form className='create-note' onSubmit={create_playlist}>
                <input type='text' name='name' value={playlist.name} onChange={handleChange}/>
                <textarea type='text' name='desc' value={playlist.desc} onChange={handleChange}/>
                <button type='submit'>Confirm</button>
            </form>
        </div>
        <button onClick={display_playlist}>TEST BTN</button>
        {/* <div>
          {playlists ? playlists.map((playlist) => {
                      return (
                          <div>
                              <Link to={''}>
                                  <button>
                                      {playlists}
                                  </button>
                              </Link>
                          </div>
                      );
          }): null}
        </div> */}

      </div>
    )
}

export default CreateArea;
