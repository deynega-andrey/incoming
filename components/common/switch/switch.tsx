import React from 'react';
import './switch.scss';

interface IProps {
  activityState: boolean;
  onToggle?: () => void;
  additionalClasses?: string;
}
const SWITCH_CLS: string = 'wrap-btn switch';
export const Switch = React.memo((props: IProps): JSX.Element => {
  const {activityState, onToggle, additionalClasses} = props;
  let switchCls: string = additionalClasses ? `${SWITCH_CLS} ${additionalClasses}` : SWITCH_CLS;
  if (activityState) {
    switchCls = `${switchCls} switch--active`;
  }
  return (
    <button
      type="button"
      className={switchCls}
      onClick={() => {
        if (onToggle) {
          onToggle();
        }
      }}
    >
      <div className="switch__toggler"></div>
    </button>
  );
});
