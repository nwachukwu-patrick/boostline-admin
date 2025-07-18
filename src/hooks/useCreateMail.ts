// useCreatePage.js
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const authToken = localStorage.getItem('accessToken');

const useCreateMail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  const createPage = async ({
    emails,
    subject,
    body,
    greetings,
    signature,
    status
  }) => {
    setLoading(true);
    setError(null);

    // Prepare the data for the API request
    const data = qs.stringify({
      emails,
      subject,
      body,
      greetings,
      signature,
      status
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/admin/sendMail`, // Ensure this is defined in your .env file
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      toast.success(response.data.message);
      setResponseData(response.data);
      navigate('/mail');
    } catch (error) {
      const detailedError = error?.response?.data || error;
      toast.error(detailedError.message);
      setError(detailedError.message);
    } finally {
      setLoading(false);
    }
  };

  const editPage = async ({
    userId,
    title,
    slug,
    image,
    content,
    location,
    status,
    id
  }) => {
    setLoading(true);
    setError(null);

    // Prepare the data for the API request
    const data = qs.stringify({
      user_id: userId,
      title,
      slug,
      image,
      content,
      location,
      status,
      last_edit: userId
    });

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/admin/sendMail?id=${id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      toast.success(response.data.message);
      setResponseData(response.data);
      navigate('/mail');
    } catch (error) {
      const detailedError = error?.response?.data || error;
      toast.error(detailedError.message);
      setError(detailedError.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async ({ id }) => {
    setLoading(true);
    setError(null);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/admin/sendMail?id=${id}&delete=yes`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      }
    };

    try {
      const response = await axios.request(config);
      toast.success(response.data.message);
      navigate('/mail');
    } catch (error) {
      const detailedError = error?.response?.data || error;
      toast.error(detailedError.message);
      setError(detailedError.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    responseData,
    createPage,
    editPage,
    deletePage
  };
};

export default useCreateMail;
