import React, { Fragment } from "react";
import HomeContainer from "./HomeContainer";
import MenuContainer from "./components/MenuContainer";

const MainContainer = () => {
  return (
    <Fragment>
      <div className="w-full h-auto flex-col items-center justify-center">
        <HomeContainer />
      </div>
    </Fragment>
  );
};

export default MainContainer;
