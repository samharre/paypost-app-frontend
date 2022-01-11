import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { useContext } from 'react';

import { PlatformsAuthContext } from '../contexts/PlatformsAuthContext';

import { constants } from '../utils/constants';

const PlatformSelection = ({ platform, setPlatform }) => {

  const { platformsAuthenticated } = useContext(PlatformsAuthContext);

  const handleChange = (event) => {
    setPlatform(event.target.value);
  };
  const platforms = Object.values(constants);

  return (

    <FormControl component="fieldset">
      <FormLabel component="legend" style={{ paddingBottom: '20px' }}>1. Select Platform</FormLabel>
      <RadioGroup aria-label="social media platforms" name="platform" value={platform} onChange={handleChange}>
        {
          platforms.map(platform => (
            <FormControlLabel
              key={platform}
              value={platform}
              control={<Radio />}
              label={platform.charAt(0).toUpperCase() + platform.slice(1)}
              disabled={!platformsAuthenticated[platform]}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
};

export default PlatformSelection;