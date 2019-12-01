import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const MyPagination = props => {
  const n = Math.ceil(props.users / props.perPage);
  let pages = [];

  for (let i = 1; i <= n; i++) {
    let page = { number: i, active: i === props.currentPage ? true : false };
    pages.push(page);
  }

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={props.currentPage === n ? false : true}>
        <PaginationLink
          previous
          href="#"
          onClick={e => props.onPageStepClick(e, -1)}
        />
      </PaginationItem>
      {pages.map(page => {
        return (
          <PaginationItem
            href="#"
            active={page.active ? true : false}
            onClick={e => props.onPageClick(e, page.active, page.number)}
          >
            <PaginationLink href="#">{page.number}</PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={props.currentPage === 1 ? false : true}>
        <PaginationLink
          next
          href="#"
          onClick={e => props.onPageStepClick(e, 1)}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default MyPagination;
