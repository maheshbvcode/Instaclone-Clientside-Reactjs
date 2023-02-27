import React, { useState, useEffect } from 'react';

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://instaclone-nodejs-server.onrender.com/allpost', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        const result = await response.json();
        setData(result.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

 
  return (
    <div className='home'>
      {data.map((item) => (
        <div className='card home-card' key={item._id}>
          <div className='edit-post'>
            <h5 style={{ textTransform: 'capitalize', marginLeft: '20px' }}>
              {item.title}
            </h5>
            <i className='material-icons edit'>more_horiz</i>
          </div>
          <h6 style={{ textTransform: 'capitalize', marginLeft: '25px' }}>
            {item.place}
          </h6>
          <div className='card-img'>
            <img src={item.photo} alt='img' width='700px' />
          </div>
          <div className='card-content'>
            <div className='card-analytics'>
              <i className='material-icons'>favorite</i>
              <i className='material-icons'>send</i>
              <span
                style={{ position: 'relative', left: '350px', fontSize: 'x-large' }}
              >
                {item.date}
              </span>
            </div>

            <p style={{ textTransform: 'capitalize' }}>{item.body}</p>
            <input type='text' placeholder='Add a comment...' />
          </div>
        </div>
      ))}
    </div>
  );
};
