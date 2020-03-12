import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

@observer
class CustomPagination extends Component {
    renderPagination = () => {
        const { store } = this.props;
        const { items, totalItems } = store.data;
        const { page, size } = store;

        if (items) {
            const totalPages = totalItems % size === 0 ? totalItems / size : totalItems / size + 1;
            const item = [];

            const pageCalc = parseInt((page - 1) / 10, 0) * 10;
            const pageEnd = pageCalc + 10 < totalPages ? pageCalc + 10 : totalPages;

            if (page > 10) {
                item.push(
                    <PaginationItem key="prev">
                        <PaginationLink
                            previous
                            href=""
                            onClick={async e => {
                                e.preventDefault();
                                store.handlePageChange(pageCalc);
                                store.search();
                            }}
                        />
                    </PaginationItem>,
                );
            }

            for (let i = pageCalc + 1; i <= pageEnd; i += 1) {
                item.push(
                    <PaginationItem key={i} className={i === page ? 'active' : ''}>
                        <PaginationLink
                            href=""
                            onClick={async e => {
                                e.preventDefault();
                                store.handlePageChange(i);
                                store.search();
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }

            if (parseInt((page - 1) / 10, 0) !== parseInt((totalPages - 1) / 10, 0)) {
                item.push(
                    <PaginationItem key="next">
                        <PaginationLink
                            next
                            href=""
                            onClick={async e => {
                                e.preventDefault();
                                store.handlePageChange(pageEnd + 1);
                                store.search();
                            }}
                        />
                    </PaginationItem>,
                );
            }

            return (
                <Pagination className="pagination pagination-blue justify-content-center" listClassName="pagination-blue">
                    {item}
                </Pagination>
            );
        }
        return null;
    };

    render() {
        return <>{this.renderPagination()}</>;
    }
}

export default CustomPagination;
