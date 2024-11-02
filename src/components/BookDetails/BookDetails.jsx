import { useLoaderData, useParams } from "react-router-dom";
import { addToStoredReadList } from "../../../utility/addtoDB";


const BookDetails = () => {
    const { bookId } = useParams();
    const data = useLoaderData();
    const id = parseInt(bookId);

    

    const book = data.find(book => book.bookId === id);
    // you got the full book object now destructure.
    // Rename duplicate
    const { bookId: currentBookId, image } = book;

    const handleMarkAsRead = (id) => {
        // Understand what to store: for my personal BookId
        // Where to store: Database. Arrary, list or collection
        // Check if the book is already in the list. if not add, if yes don't.
        // 
        addToStoredReadList(id);

    }

    return (
        <div className="my-12">
            <h2>Book Details {currentBookId}</h2>
            <img className="w-36" src={image} alt="" />
            <br></br>
            <button onClick={() => { handleMarkAsRead(bookId) }} className="btn mr-4 btn-accent">Read</button>
            <button className="btn btn-accent">Add to Wishlist</button>
        </div>
        // Do the customization yourself.

    );
};

export default BookDetails;