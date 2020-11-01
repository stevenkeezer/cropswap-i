// import div from "react-router-dom";
import React, { useState } from "react";
import { EuiSideNav } from "@elastic/eui";

const Toolbar = ({ history }) => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: "My cropswap",
      id: 0,
      items: [
        {
          name: "Orders",
          id: 1,
          onClick: () => {
            history.push("/profile");
          },
          isSelected: true,
        },
        {
          name: "Selling",
          id: 2,
          onClick: () => {
            history.push("/selling");
          },
        },
        {
          name: "Saved farms",
          id: 3,
          // onClick: () => {},
        },
        {
          name: "Account settings",
          id: 4,
          // onClick: () => {},
        },
      ],
    },
  ];
  return (
    <>
      <EuiSideNav
        mobileTitle="Navigate"
        toggleOpenOnMobile={() => toggleOpenOnMobile()}
        isOpenOnMobile={isSideNavOpenOnMobile}
        style={{ width: 192 }}
        items={sideNav}
      ></EuiSideNav>
    </>
  );
};

export default Toolbar;
