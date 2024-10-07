import React, { useCallback } from 'react';
import './Settings.scss';
import { FieldSize } from '../../types';
import SettingSwitch from '../SettingSwitch/SettingSwitch';

const OPEN_CELL_TEXT = 'open cell';
const FLAG_TEXT = 'add/remove flag';

const Settings: React.FC <{
  fieldSize: FieldSize,
  setFieldSize: ({ width, height }: FieldSize) => void,
  invertControls: boolean,
  setInvertControls: (value: boolean) => void,
}> = ({ fieldSize, setFieldSize, invertControls, setInvertControls }) => {
  let { width: defaultWidth, height: defaultHeight } = fieldSize;
  let { width, height } = fieldSize;
  const handleFieldSizeSubmit = () => {
    setFieldSize({ width, height });
  };

  const mouseClickText = useCallback(() => {
    return {
      left: invertControls ? FLAG_TEXT : OPEN_CELL_TEXT,
      right: invertControls ? OPEN_CELL_TEXT : FLAG_TEXT,
    };
  }, [invertControls]);

  return (
    <aside className="settings">
      <div className="settings__block">
        <div className="title">Legend</div>
        <div className="subtitle">Mouse clicks</div>
        <div>Left button - {mouseClickText().left}</div>
        <div>Right button - {mouseClickText().right}</div>
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
      <div className="settings__block">
        <div className="title">Invert controls</div>
        <SettingSwitch
          onClick={setInvertControls}
          value={invertControls}
        />
      </div>
    </aside>
  );
}

export default Settings;
