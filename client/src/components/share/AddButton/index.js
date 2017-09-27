//todo
import React from 'react';
import { Link } from 'react-router-dom';
import pathConfigs from '../../../routes/path';

const AddButton = () => {
    return <Link to={pathConfigs.add} className="icon icon-add-fill" />;
};

export default AddButton;