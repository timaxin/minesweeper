import React from 'react';
import './SettingSwitch.scss';

const SettingSwitch: React.FC<{
  onClick: (value: boolean) => void,
  value: boolean,
}> = ({ onClick, value }) => {
  const classes = [
    'toggle-switch',
    value && 'active'
  ].filter(Boolean).join(' ');
  return (
    <span className={classes} onClick={() => onClick(!value)}>
      <span className="toggle-knob"></span>
    </span>
  );
};

export default SettingSwitch;
