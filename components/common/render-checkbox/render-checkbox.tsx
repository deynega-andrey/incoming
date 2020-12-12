import {Checkbox} from "@openvtb/react-ui-kit";
import React from "react";

const renderCheckbox = (id: number, registryId: number | null, bodyRequest: any, setBodyRequest: any) => {

  return (
    <Checkbox
      checked={bodyRequest.id === id ? true : false}
      id={id}
      size='small'
      onChange={(e) => {
        e.stopPropagation()
        if (bodyRequest.id === id) {
          setBodyRequest({...bodyRequest, id: null, registryId, check: false});
        } else {
          setBodyRequest({...bodyRequest, id, registryId, check: true});
        }
      }}
    />
  );
};

export default renderCheckbox;