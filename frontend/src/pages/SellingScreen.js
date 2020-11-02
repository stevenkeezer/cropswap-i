import React, { useEffect, useState } from "react";
import {
  EuiDragDropContext,
  euiDragDropMove,
  euiDragDropReorder,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Toolbar from "../components/Toolbar";

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

const list = [
  {
    content: `Item 324`,
    id: makeId(),
  },
];

const InitialIsOpen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const [list1, setList1] = useState(makeList(3, 4));
  const [list2, setList2] = useState(makeList(3, 4));
  const history = useHistory();

  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_1: list1, DROPPABLE_AREA_2: list2 };
    const actions = {
      DROPPABLE_AREA_1: setList1,
      DROPPABLE_AREA_2: setList2,
    };
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = euiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        );

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = euiDragDropMove(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fafbfd" }} className="tw-h-screen">
      <EuiPage restrictWidth="75rem">
        <EuiPageSideBar>
          <Toolbar history={history} selling />
        </EuiPageSideBar>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <div className="tw-p-0  lg:tw-pt-6 tw-pt-2 tw-pb-1  tw-tracking-normal lg:tw-pt-1 tw-text-gray-900 tw-text-2xl tw-font-semibold ">
                  Inventory
                </div>
              </EuiTitle>
              <p className="tw-text-xs tw-italic">
                Keep track of products you have available by dragging them into,
                or out of stock.
              </p>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                In stock
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                Out of stock
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiDragDropContext onDragEnd={onDragEnd}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiDroppable
                      droppableId="DROPPABLE_AREA_1"
                      spacing="m"
                      withPanel
                      grow={false}
                    >
                      {list.length > 0 ? (
                        list.map(({ content, id }, idx) => (
                          <EuiDraggable
                            spacing="m"
                            key={id}
                            index={idx}
                            draggableId={id}
                          >
                            {(provided, state) => (
                              <EuiPanel>
                                {content}
                                {state.isDragging && " ✨"}
                              </EuiPanel>
                            )}
                          </EuiDraggable>
                        ))
                      ) : (
                        <EuiFlexGroup
                          alignItems="center"
                          justifyContent="spaceAround"
                          gutterSize="none"
                          style={{ height: "100%" }}
                        >
                          <EuiFlexItem grow={false}>
                            <EuiIcon type="faceSad" />
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      )}
                    </EuiDroppable>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiDroppable
                      droppableId="DROPPABLE_AREA_2"
                      spacing="m"
                      withPanel
                      grow={false}
                    >
                      {list2.length > 0 ? (
                        list2.map(({ content, id }, idx) => (
                          <EuiDraggable
                            spacing="m"
                            key={id}
                            index={idx}
                            draggableId={id}
                          >
                            {(provided, state) => (
                              <EuiPanel>
                                {content}
                                {state.isDragging && " ✨"}
                              </EuiPanel>
                            )}
                          </EuiDraggable>
                        ))
                      ) : (
                        <EuiFlexGroup
                          alignItems="center"
                          justifyContent="spaceAround"
                          gutterSize="none"
                          style={{ height: "100%" }}
                        >
                          <EuiFlexItem grow={false}>
                            <EuiIcon type="faceSad" />
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      )}
                    </EuiDroppable>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiDragDropContext>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};

export default InitialIsOpen;
