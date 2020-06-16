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
            <a className="page-link" href="#" aria-label="Previous" tabindex="-1" aria-disabled="true" onClick={onClick}>
                <span aria-hidden="true">{text}</span>
            </a>
            </li> 
            : 
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={onClick}>
                    <span aria-hidden="true">{text}</span>
                </a>
            </li>
    } 


    function onPageChange(newPage) {
        console.log(newPage);   
    }

    let startArrow = makeArrow(isFirst, "<<", () => onPageChange(1));
    let leftArrow = makeArrow(isFirst, "<", () => onPageChange(props.page - 1));
    let rightArrow = makeArrow(isLast, ">", () => onPageChange(props.page + 1));
    let endArrow = makeArrow(isLast, ">>", () => onPageChange(props.maxPage));

    return (
        <nav aria-label="Table pagination">
            <ul class="pagination">
                {startArrow}
                {leftArrow}
                <li class="page-item"><a class="page-link" href="#">{props.page}</a></li>
                {rightArrow}
                {endArrow}
            </ul>
        </nav>
    )
}