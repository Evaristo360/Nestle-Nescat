import { useRef, useEffect } from 'react';
import { config } from 'providers/config';
import { doGetFile } from 'hooks/useAxios';

export const useExportFile = () => {
  const linkRef = useRef(null);

  useEffect(() => {
    if(linkRef.current && linkRef.current.style){
      linkRef.current.style.display = 'none';      
    }
  }, []);

  const downloadFile = async ({ endpoint = '', filename = '', useToken = true }) => {
    if (linkRef.current) {
      if (useToken) {
        const blob = await getBlob(endpoint);
        linkRef.current.href = URL.createObjectURL(blob);
      } else {
        linkRef.current.href = `${config.siteConfig.apiUrl}${endpoint}`;
      }

      if (filename) {
        linkRef.current.download = filename;
      } else {
        linkRef.current.download = true;
      }
        
      linkRef.current.click();
    }
  };

  const getBlob = async (endpoint = '') => {
    try{
      const response = await doGetFile(endpoint);
      if(response)
        return response;
    } catch(error){
      console.log({ error });
    }
    return null;
  }

  return {
    linkRef,
    downloadFile
  };
};
