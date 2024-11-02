import { useLoaderData, useParams } from "react-router-dom";


const BookDetails = () => {
    const { bookId } = useParams();
    const data = useLoaderData();
    const id = parseInt(bookId);

    const book = data.find(book => book.bookId === id);
    // you got the full book object now destructure.
    // Rename duplicate
    const { bookId: currentBookId, image } = book;


    return (
        <div className="my-12">
            <h2>Book Details {currentBookId}</h2>
            <img className="w-36" src={image} alt="" />
            <br></br>
            <button className="btn mr-4 btn-accent">Read</button>
            <button className="btn btn-accent">Wishlist</button>
        </div>
        // Do the customization yourself.

    );
};

export default BookDetails;