import React from 'react';
import './Settings.scss';
import { FieldSize } from '../../types';

const Settings: React.FC <{
  fieldSize: FieldSize,
  setFieldSize: ({ width, height }: FieldSize) => void,
}> = ({ fieldSize, setFieldSize }) => {
  let { width: defaultWidth, height: defaultHeight } = fieldSize;
  let { width, height } = fieldSize;
  const handleFieldSizeSubmit = () => {
    setFieldSize({ width, height });
  };

  return (
    <aside className="settings">
      <div className="settings__block">
        <div className="title">Legend</div>
        <div className="subtitle">Mouse clicks</div>
        <div>Left button - open cell</div>
        <div>Right button - add/remove flag</div>
      </div>
      <div className="settings__block">
        <div className="title">Field Size</div>
        <div className="subtitle">Width</div>
        <input type="number" defaultValue={defaultWidth} onChange={val => width = +val.target.value}/>
        <div className="subtitle">Height</div>
        <input type="number" defaultValue={defaultHeight} onChange={val => height = +val.target.value}/>
        <div>
          <button className="button settings__block_submit" type="button" onClick={handleFieldSizeSubmit}>Update settings</button>
        </div>
      </div>
    </aside>
  );
}

export default Settings;