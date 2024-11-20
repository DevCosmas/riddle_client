import { toast, Bounce } from 'react-toastify';

const handleServerError = (errorStatus, message, navigate = null) => {
  const toastProp = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  };

  if (message.includes('jwt')) {
    navigate === null ? (window.location.href = '/login') : navigate('/login');
  }

  if (message.includes('password')) {
    toast.warning(message, { ...toastProp });
  }

  if (errorStatus === 400) {
    toast.warning(message, { ...toastProp });
  }
  if (errorStatus === 404) {
    toast.error(message, { ...toastProp });
  }
  if (errorStatus === 500) {
    toast.error('Something went really wrong here. Try again later', {
      ...toastProp,
    });
  }
};

export { handleServerError };
