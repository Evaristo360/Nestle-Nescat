import { useRef } from 'react';

const useInputImageFormik = ({ formik, separator = '_' }) => {
  const imageRef = useRef(null);

  const onChangeInputFile = (event) => {
    const name = event.target.name;
    const file = event.target.files[0];

    formik.handleChange({
      target: { name: `${name}${separator}type`, value: file.type }
    });
    formik.handleChange({
      target: { name: `${name}${separator}size`, value: file.size }
    });
    formik.handleChange({
      target: { name: `${name}${separator}file`, value: file }
    });
    formik.handleChange({
      target: { name, value: file.name }
    });
  };

  const selectImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return {
    imageRef,
    onChangeInputFile,
    selectImage
  };
};

export { useInputImageFormik };
