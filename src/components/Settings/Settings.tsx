import React, { useCallback } from 'react';
import './Settings.scss';
import SettingSwitch from '../SettingSwitch/SettingSwitch';
import { useSettings, useSettingsDispatch } from '../SettingsProvider/SettingsProvider';

const OPEN_CELL_TEXT = 'open cell';
const FLAG_TEXT = 'add/remove flag';

const Settings: React.FC = () => {
  const { invertControls, fieldSize, bombsCount: defaultBombsCount } = useSettings();
  const dispatch = useSettingsDispatch();
  let { width, height } = fieldSize;
  let bombsCount = 0;

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
        <input type="number" defaultValue={fieldSize.width} onChange={el => width = +el.target.value}/>
        <div className="subtitle">Height</div>
        <input type="number" defaultValue={fieldSize.height} onChange={el => height = +el.target.value}/>
        <div>
          <button className="button settings__block_submit" type="button" onClick={() => {
            dispatch({
              type: 'setFieldSize',
              value: { width, height },
            });
          }}>Update field size</button>
        </div>
      </div>
      <div className="settings__block">
        <div className="title">Bombs Count</div>
        <input type="number" defaultValue={defaultBombsCount} onChange={el => bombsCount = +el.target.value}/>
        <div>
          <button className="button settings__block_submit" type="button" onClick={() => {
            dispatch({
              type: 'setBombsCount',
              value: bombsCount,
            });
          }}>Update bombs count</button>
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
