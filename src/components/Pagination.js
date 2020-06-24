import React from 'react'

// props.page -> Current page number
// props.maxPage -> Last page number
// props.onChange -> callback when page changed

export default function Pagination(props) {

    let isFirst = props.page === 1;
    let isLast = props.page === props.maxPage;

    function makeArrow(isDisabled, text, onClick) {
        return isDisabled ? 
            <li className="page-item disabled">
            <button className="page-link" aria-label="Previous" tabIndex="-1" aria-disabled="true" onClick={onClick}>
                <span aria-hidden="true">{text}</span>
            </button>
            </li> 
            : 
            <li className="page-item">
                <button className="page-link" aria-label="Previous" onClick={onClick}>
                    <span aria-hidden="true">{text}</span>
                </button>
            </li>
    } 


    function onPageChange(newPage) {
        console.log(newPage);   
        props.onChange(newPage)
    }

    let startArrow = makeArrow(isFirst, "<<", () => onPageChange(1));
    let leftArrow = makeArrow(isFirst, "<", () => onPageChange(props.page - 1));
    let rightArrow = makeArrow(isLast, ">", () => onPageChange(props.page + 1));
    let endArrow = makeArrow(isLast, ">>", () => onPageChange(props.maxPage));

    return (
        <nav aria-label="Table pagination">
            <ul className="pagination">
                {startArrow}
                {leftArrow}
                <li className="page-item"><button className="page-link" >{props.page}</button></li>
                {rightArrow}
                {endArrow}
            </ul>
        </nav>
    )
}