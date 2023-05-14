function PageHandleButton({
  currentPage,
  isFirst,
  isLast,
  onPreviousClick,
  onNextClick,
}) {
  if (currentPage == 1 && isLast) {
    return;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onPreviousClick}
        disabled={isFirst}
        className="flex h-10 w-10 items-center justify-center rounded text-base tracking-wider text-green-500 shadow-md"
      >{`<`}</button>
      <button className="flex h-10 w-10 items-center justify-center rounded text-base tracking-wider text-green-500 shadow-md">
        {currentPage}
      </button>
      <button
        onClick={onNextClick}
        disabled={isLast}
        className="flex h-10 w-10 items-center justify-center rounded text-base tracking-wider text-green-500 shadow-md"
      >{`>`}</button>
    </div>
  );
}

export default PageHandleButton;
