import { useState } from 'react';
import { Loader } from 'components/Loader';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  SearchField,
  Form,
  SearchButton,
  Label,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit, load }) => {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchQuery(e) {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (searchQuery.trim() === '')
      return toast.error('This field must not be empty!');

    onSubmit(searchQuery);
    setSearchQuery('');
  }

  return (
    <SearchField>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <Label>Search</Label>
        </SearchButton>

        <Input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleSearchQuery}
          value={searchQuery}
          placeholder="Search images and photos"
        />
        {load && <Loader />}
      </Form>
    </SearchField>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
};
