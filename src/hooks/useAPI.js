import {useState, useEffect} from 'react';
import axios from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const';

const useAPI = (url) => {
  const [actualData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.
    create({
      baseURL: BACKEND_URL,
      timeout: REQUEST_TIMEOUT,
      withCredentials: true,
    })
      .get(url)
      .then(({data}) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return [actualData, isLoading];
};

export default useAPI;
