import React from "react";
import { EuiIcon, EuiKeyPadMenuItem } from "@elastic/eui";
export default function Categories({ history }) {
  return (
    <>
      <div className="tw-flex tw-justify-center tw-overflow-x-auto tw-hidden lg:tw-flex tw-max-w-screen-xl tw-py-3 tw-py-6 tw-gap-10 tw-mx-auto">
        <EuiKeyPadMenuItem
          onClick={(e) => history.push("/search/onion")}
          label="All Products"
        >
          <EuiIcon type={"/onion.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Tomatoes"
          onClick={(e) => history.push("/search/tomatoes")}
        >
          <EuiIcon type={"/tomatoe.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Peppers"
          onClick={(e) => history.push("/search/pepper")}
        >
          <EuiIcon type={"/pepper.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Apples"
          onClick={(e) => history.push("/search/apple")}
        >
          <EuiIcon type={"/apple.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Mushrooms"
          onClick={(e) => history.push("/search/mushroom")}
        >
          <EuiIcon type={"/mushroom.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Eggs"
          onClick={(e) => history.push("/search/egg")}
        >
          <EuiIcon type={"/egg.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Lemons"
          onClick={(e) => history.push("/search/lemon")}
        >
          <EuiIcon type={"/lemon.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Fresh Juice"
          onClick={(e) => history.push("/search/juice")}
        >
          <EuiIcon type={"/juice.svg"} size="xl" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem
          label="Carrots"
          onClick={(e) => history.push("/search/carrot")}
        >
          <EuiIcon type={"/carrot.svg"} size="xl" />
        </EuiKeyPadMenuItem>
      </div>
    </>
  );
}
