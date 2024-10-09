import React, { useCallback } from 'react';
import './Settings.scss';
import SettingSwitch from '../SettingSwitch/SettingSwitch';
import { useSettings, useSettingsDispatch } from '../SettingsProvider/SettingsProvider';

const OPEN_CELL_TEXT = 'open cell';
const FLAG_TEXT = 'add/remove flag';

const Settings: React.FC = () => {
  const { invertControls, fieldSize } = useSettings();
  const dispatch = useSettingsDispatch();
  let { width, height } = fieldSize;
  const handleFieldSizeSubmit = () => {
    dispatch({
      type: 'setFieldSize',
      value: { width, height }
    });
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
        <input type="number" defaultValue={fieldSize.width} onChange={val => width = +val.target.value}/>
        <div className="subtitle">Height</div>
        <input type="number" defaultValue={fieldSize.height} onChange={val => height = +val.target.value}/>
        <div>
          <button className="button settings__block_submit" type="button" onClick={handleFieldSizeSubmit}>Update settings</button>
        </div>
      </div>
      <div className="settings__block">
        <div className="title">Invert controls</div>
        <SettingSwitch
          onClick={value => {
              dispatch({
                type: 'setInvertControls',
                value,
              })
            }
          }
          value={invertControls}
        />
      </div>
    </aside>
  );
}

export default Settings;
