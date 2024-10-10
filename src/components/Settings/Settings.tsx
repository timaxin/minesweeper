import React, { useCallback, useMemo, useState } from 'react';
import './Settings.scss';
import SettingSwitch from '../SettingSwitch/SettingSwitch';
import { useSettings, useSettingsDispatch } from '../SettingsProvider/SettingsProvider';
import { z , ZodIssue } from 'zod';

const OPEN_CELL_TEXT = 'open cell';
const FLAG_TEXT = 'add/remove flag';

type ConfigKeys = 'width' | 'height' | 'bombsCount';
type CustomIssue = Omit<ZodIssue, 'path'> & {
  path: [ConfigKeys, ...any[]];
};

const Settings: React.FC = () => {
  const { invertControls, fieldSize, bombsCount: defaultBombsCount } = useSettings();
  const dispatch = useSettingsDispatch();
  let { width, height } = fieldSize;
  let bombsCount = defaultBombsCount;
  const [errors, setErrors] = useState<{ width: string | null; height: string | null; bombsCount: string | null }>({
    width: null,
    height: null,
    bombsCount: null,
  });

  const settingsSchema = useMemo(() => z.object({
    width: z.number().min(3, 'Width must be at least 3').max(30, 'Width must not exceed 30'),
    height: z.number().min(3, 'Height must be at least 3').max(30, 'Height must not exceed 30'),
    bombsCount: z.custom<number>(val => {
      return typeof val === 'number' && val <= width * height;
    }, {
      message: 'There must be less bombs than the field can store',
    }),
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
      setErrors({
        width: null,
        height: null,
        bombsCount: null,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues as CustomIssue[]) {
          const key: ConfigKeys = issue.path[0];
          setErrors({
            ...errors,
            [key]: issue.message,
          });
        }
      } else {
        console.error('Unexpected error: ', error);
      }
    }
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
        <input type="number" defaultValue={fieldSize.width} onChange={el => width = +el.target.value}/>
        {errors.width && <div className="error">{errors.width}</div>}
        <div className="subtitle">Height</div>
        <input type="number" defaultValue={fieldSize.height} onChange={el => height = +el.target.value}/>
        {errors.height && <div className="error">{errors.height}</div>}
      </div>
      <div className="settings__block">
        <div className="title">Bombs Count</div>
        <input type="number" defaultValue={defaultBombsCount} onChange={el => bombsCount = +el.target.value}/>
        {errors.bombsCount && <div className="error">{errors.bombsCount}</div>}
        <div>
          <button className="button settings__block_submit" type="button" onClick={handleSettingsChange}>Update field settings</button>
        </div>
      </div>
      <div className="settings__block">
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
