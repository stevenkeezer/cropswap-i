import { EuiFlexGroup, EuiFlexItem, EuiPagination } from "@elastic/eui";
import React from "react";

export default function Paginate({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  history,
}) {
  return (
    pages > 1 && (
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiPagination
          aria-label="Centered pagination example"
          pageCount={pages}
          activePage={page - 1}
          onPageClick={(activePage) =>
            history.push(
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${activePage + 1}`
                  : `/page/${activePage + 1}`
                : `/admin/productlist/${activePage + 1}`
            )
          }
        />
      </EuiFlexGroup>
    )
  );
}
