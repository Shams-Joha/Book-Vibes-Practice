import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getStoredReadList } from '../../../utility/addtoDB';
import Book from '../Book/Book';

const ListedBooks = () => {

    const allBooks = useLoaderData();
    const [readList, setReadList] = useState([]);

    useEffect(() => {

        // Get the read list id stored in local storage.
        const storedReadList = getStoredReadList();

        // Convert them into int to compare them.
        const storedReadListInt = storedReadList.map(id => parseInt(id));
        // Worst way
        const readBookList = allBooks.filter(book => storedReadListInt.includes(book.bookId))
        setReadList(readBookList);
    }, [])

    // ideally we will directly get the read book list from the database.
    return (
        <div>
            <h2 className="text-3xl my-8">Listed Books</h2>
            <Tabs>
                <TabList>
                    <Tab>Read List</Tab>
                    <Tab>Wish List</Tab>
                </TabList>

                <TabPanel>
                    {/* Error Started from here. Recheck */}
                    <h2 className='mb-4 text-2xl font-bold'>Books I have read: {readList.length}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5'>
                        {
                            readList.map(book => <Book key={book.bookId} book={book}></Book>)
                        }
                    </div>

                </TabPanel>
                <TabPanel>
                    <h2>Books in my Wishlist</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ListedBooks;