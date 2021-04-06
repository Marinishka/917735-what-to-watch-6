import {useState, useEffect} from 'react';
import axios from 'axios';
import {BACKEND_URL, CONNECTION_ERROR, REQUEST_TIMEOUT, Routes, StatusCodes} from '../const';

const useAPI = (url) => {
  const [actualData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      .catch((err) => {
        setError(`We don't know what happened`);
        if (err.message === CONNECTION_ERROR) {
          setError(`Internet connection error. Check the connection.`);
        } else if (err.response.status === StatusCodes.BAD_REQUEST) {
          setError(`Invalid request sent.`);
        } else if (err.response.status >= StatusCodes.SERVER_ERROR_FIRST && err.response.status <= StatusCodes.SERVER_ERROR_LAST) {
          setError(`We have something broken on server. Try again later.`);
        } else if (err.response.status === StatusCodes.NOT_FOUND) {
          history.push(Routes.NOT_FOUND);
        }
        setIsLoading(false);
      });
  }, []);

  return [actualData, isLoading, error];
};

export default useAPI;
