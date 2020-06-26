import React from 'react';
import Image from 'react-image-resizer';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as applicationStyles from '../../application_styles';
import * as labels from '../labels';
import * as customImage from '../../Images/custom_image.jpg';

export default function ImageFileChooser(props) {
  const ref = React.createRef();
  return (
    <div>
      <Image width={200} height={200} src={props.photo || customImage} alt="" />
      <br />
      <input
        id={props.id}
        type="file"
        onChange={event => props.onChange(event)}
        ref={ref}
        style={{ display: 'none' }}
      />
      {!props.disabled && (
        <Button
          type="button"
          onClick={() => ref.current.click()}
          style={{ ...applicationStyles.addButton, width: '100%' }}
        >
          {labels.ADD_IMAGE}
        </Button>
      )}
    </div>
  );
}

ImageFileChooser.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  photo: PropTypes.string
};

ImageFileChooser.defaultProps = {
  id: 'photo',
  disabled: false
};
