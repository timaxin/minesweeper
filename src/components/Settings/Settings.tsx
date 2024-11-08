import React, { useMemo, useState, useRef, useEffect } from 'react';
import './Settings.scss';
import SettingSwitch from '../SettingSwitch/SettingSwitch';
import { useSettings, useSettingsDispatch } from '../SettingsProvider/SettingsProvider';
import { z } from 'zod';
import { SettingsZodIssue, SettingsErrors, SettingsConfigKeys, FieldSize, SettingsState } from '../../types';
import compareUsingJSON from '../../utils/compareUsingJSON';

const OPEN_CELL_TEXT = 'open cell';
const FLAG_TEXT = 'add/remove flag';

const Settings: React.FC = () => {
  const { invertControls, fieldSize, bombsCount: defaultBombsCount, opened: settingsOpened } = useSettings();
  const dispatch = useSettingsDispatch();
  const previousSettings = useRef<Pick<SettingsState, 'fieldSize' | 'bombsCount'>>({ fieldSize, bombsCount: defaultBombsCount });
  let [settingsPersist, setSettingsPersist] = useState<boolean>(false);

  let [{ width, height }, setLocalFieldSize] = useState<FieldSize>(fieldSize);
  let [bombsCount, setLocalBombsCount] = useState<number>(defaultBombsCount);
  const [errors, setErrors] = useState<SettingsErrors>({});

  useEffect(() => {
    setSettingsPersist(compareUsingJSON({
      fieldSize: { width, height },
      bombsCount,
    }, previousSettings.current));
  }, [width, height, bombsCount]);

  const closeSettings = () => {
    dispatch({
      type: 'setOpened',
      value: false,
    });
  };

  const settingsSchema = useMemo(() => z.object({
    width: z.number().min(3, 'Width must be at least 3').max(30, 'Width must not exceed 30'),
    height: z.number().min(3, 'Height must be at least 3').max(30, 'Height must not exceed 30'),
    bombsCount: z.number().min(1, 'There must be at least 1 bomb').max(width * height, 'There must be fewer bombs than the field can hold')
  }), [width, height]);

  const handleSettingsChange = () => {
    try {
      const parsedSettingsSchema = settingsSchema.parse({ width, height, bombsCount });
      dispatch({
        type: 'setFieldSize',
        value: { width: parsedSettingsSchema.width, height: parsedSettingsSchema.height },
      });
      dispatch({
        type: 'setBombsCount',
        value: parsedSettingsSchema.bombsCount,
      });
      setSettingsPersist(true);
      previousSettings.current = {
        fieldSize: { width, height },
        bombsCount,
      };
      setErrors({
        width: null,
        height: null,
        bombsCount: null,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const existingErrors: SettingsErrors = {};
        for (const issue of error.issues as SettingsZodIssue[]) {
          const key: SettingsConfigKeys = issue.path[0];
          existingErrors[key] = issue.message;
        }
        setErrors(existingErrors);
      } else {
        console.error('Unexpected error: ', error);
      }
    }
  };

  const mouseClickText = useMemo(() => {
    return {
      left: invertControls ? FLAG_TEXT : OPEN_CELL_TEXT,
      right: invertControls ? OPEN_CELL_TEXT : FLAG_TEXT,
    };
  }, [invertControls]);

  return (
    <aside inert={settingsOpened ? undefined : ''} className={`settings ${settingsOpened ? 'settings_opened' : ''}`}>
      <div tabIndex={0} className="cross toggle-button settings_button-close" onClick={closeSettings}>
      </div>
      <div className="settings__section">
        <div className="title">Legend</div>
        <div className="settings__block">
          <div className="subtitle">Mouse clicks</div>
          <div>Left button - {mouseClickText.left}</div>
          <div>Right button - {mouseClickText.right}</div>
        </div>
      </div>
      <div className="settings__section">
        <div className="title">Field Size</div>
        <div className="settings__block">
          <div className="subtitle">Width</div>
          <input type="number" defaultValue={fieldSize.width} onChange={el => setLocalFieldSize({ width: +el.target.value, height })}/>
          {errors.width && <div className="error">{errors.width}</div>}
        </div>
        <div className="settings__block">
          <div className="subtitle">Height</div>
          <input type="number" defaultValue={fieldSize.height} onChange={el => setLocalFieldSize({ width, height: +el.target.value })}/>
          {errors.height && <div className="error">{errors.height}</div>}
        </div>
      </div>
      <div className="settings__section">
        <div className="title">Bombs Count</div>
          <div className="settings__block">
          <input type="number" defaultValue={defaultBombsCount} onChange={el => setLocalBombsCount(+el.target.value)}/>
          {errors.bombsCount && <div className="error">{errors.bombsCount}</div>}
        </div>
      </div>
      <div className="settings__submit">
        <button className="button button_submit" disabled={settingsPersist} type="button" onClick={handleSettingsChange}>Update field settings</button>
      </div>
      <div className="settings__section">
        <div className="title">Invert controls</div>
        <SettingSwitch
          onClick={value => {
              dispatch({
                type: 'setInvertControls',
                value,
              });
            }
          }
          value={invertControls}
        />
      </div>
    </aside>
  );
};

export default Settings;
