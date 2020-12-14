import book from "./book";

const books = [...Array(10)].map((_value, id) => ({ ...book, id }));

export default books;
