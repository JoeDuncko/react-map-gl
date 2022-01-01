import * as React from 'react';
import mapboxgl from '../utils/mapboxgl';
import useControl from './use-control';

import type {ControlPosition} from '../utils/types';

export type ScaleControlProps = {
  /** Unit of the distance. Default 'metric'. */
  unit?: 'imperial' | 'metric' | 'nautical';
  /** The maximum length of the scale control in pixels. Default 100. */
  maxWidth?: number;
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
};

const defaultProps: ScaleControlProps = {
  unit: 'metric',
  maxWidth: 100
};

function ScaleControl(props: ScaleControlProps): null {
  const ctrl = useControl(
    () => new mapboxgl.ScaleControl(props),
    props.position
  ) as mapboxgl.ScaleControl;

  // @ts-ignore
  if (ctrl.options.unit !== props.unit || ctrl.options.maxWidth !== props.maxWidth) {
    // @ts-ignore
    ctrl.options.maxWidth = props.maxWidth;
    // This method will trigger an update
    ctrl.setUnit(props.unit);
  }

  return null;
}

ScaleControl.defaultProps = defaultProps;

export default React.memo(ScaleControl);