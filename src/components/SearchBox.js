import React from "react";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.value}
        onKeyUp={event => {
          if (event.key === "Enter") {
            props.setSearchValue(event.target.value);
          }
        }}
      ></input>
    </div>
  );
};

export default SearchBox;
