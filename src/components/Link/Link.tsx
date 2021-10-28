import React from 'react';
import './Link.css';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  text: string;
  active?: boolean;
  url: string;
  color?: 'light'|'dark';
}

export const Link: React.FC<LinkProps> = (props) => {
  const { url, text, color = 'dark' } = props;

  return <NavLink
    className={`Link Link--${color}`}
    activeClassName="Link--active"
    to={url}
    >
    {text}
  </NavLink>;
}