import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Pagination } from "react-bootstrap";

// пагинация настроена здесь

const Pages = observer(() => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []
    
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
        
    }

    return (
        
        <Pagination className="mt-3 div-pagination">
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    className="item-pagination"
                    active={device.page === page}
                    onClick={() => device.setPage(page)}
                >
                    {page} 
                </Pagination.Item>
            )}
        </Pagination>
    )
});

export default Pages;