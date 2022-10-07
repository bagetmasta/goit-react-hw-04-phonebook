import PropTypes from 'prop-types';
import { Input } from '../Filter';

export const Filter = ({ onChange, filter }) => {
  const handleChange = e => {
    onChange(e.currentTarget.value);
  };

  return (
    <>
      <p>Find contacts by name</p>
      <Input type="text" onChange={handleChange} value={filter} />
    </>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
