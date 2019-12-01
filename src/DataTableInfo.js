import React from "react";

const DataTableInfo = props => {
  return (
    <div
      className="dataTables-info"
      role="status"
      aria-live="polite"
    >{`Showing ${props.start} to ${props.end} of ${props.total} users`}</div>
  );
};

export default DataTableInfo;
