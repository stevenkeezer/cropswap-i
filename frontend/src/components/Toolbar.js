import React, { useState, useEffect } from "react";
import { EuiIcon, EuiSideNav } from "@elastic/eui";

export default ({ history, settings, profile, selling }) => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState("orders");

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  useEffect(() => {
    setSelectedItem(selectedItemName);
  }, [selectedItemName]);

  return (
    <EuiSideNav
      mobileTitle={
        settings ? "Settings" : profile ? "Profile" : selling ? "Selling" : ""
      }
      className="sm:tw-mt-4"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={[
        {
          icon: (
            <EuiIcon type="home" className="tw-text-gray-600 tw-rounded-full" />
          ),
          name: "My cropswap",
          id: 0,
          items: [
            {
              name: "Orders",
              id: 2,
              isSelected: profile,
              onClick: (e) => {
                e.preventDefault();
                history.push("/profile");
              },
            },
            {
              name: "Selling",
              id: 3,
              isSelected: selling,
              onClick: (e) => {
                e.preventDefault();
                history.push("/selling");
              },
            },
          ],
        },
        {
          icon: <EuiIcon type="gear" />,
          name: "Account",
          id: 0,
          items: [
            {
              name: "Advanced settings",
              id: 1,
              isSelected: settings,
              onClick: (e) => {
                e.preventDefault();
                history.push("/settings");
                // setSelectedItem("settings");
              },
            },
          ],
        },
      ]}
      style={{ width: 192 }}
    />
  );
};

// import React, { useState } from "react";
// import { EuiSideNav } from "@elastic/eui";

// const Toolbar = ({ history }) => {
//   const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);
//   const [selectedItemName, setSelectedItem] = useState(null);

//   const selectItem = (name) => {
//     setSelectedItem(name);
//   };

//   const toggleOpenOnMobile = () => {
//     setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
//   };

//   const sideNav = [
//     {
//       name: "My cropswap",
//       id: 0,
//       items: [
//         {
//           name: "Orders",
//           id: 1,
//           onClick: (name) => {
//             selectItem(name);
//             history.push("/profile");
//           },
//           isSelected: selectedItemName === name,
//         },
//         {
//           name: "Selling",
//           id: 2,
//           onClick: (name) => {
//             selectItem(name);
//             history.push("/selling");
//           },
//           isSelected: selectedItemName === name,
//         },
//         {
//           name: "Saved farms",
//           id: 3,
//           // onClick: () => {},
//         },
//         {
//           name: "Account settings",
//           id: 4,
//           onClick: (name) => {
//             selectItem(name);
//             history.push("/settings");
//           },
//           isSelected: selectedItemName === name,
//         },
//       ],
//     },
//   ];
//   return (
//     <>
//       <EuiSideNav
//         mobileTitle="Navigate"
//         toggleOpenOnMobile={() => toggleOpenOnMobile()}
//         isOpenOnMobile={isSideNavOpenOnMobile}
//         style={{ width: 192 }}
//         items={sideNav}
//       ></EuiSideNav>
//     </>
//   );
// };

// export default Toolbar;
