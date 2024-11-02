import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getStoredReadList } from '../../../utility/addtoDB';

const ListedBooks = () => {

    const allBooks = useLoaderData();

    useEffect(() => {
        const [readList, setReadList] = useState([]);
        const storedReadList = getStoredReadList();
        const storedReadListInt = storedReadList.map(id => parseInt(id));
        // Worst way

        const readBookList = allBooks.filter(book => storedReadListInt.includes(book.bookid))
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
                    <h2>Books I read{readList.length}</h2>
                    {
                        readlist.map(book => <Book key={book.bookid} book={book}></Book>)
                    }
                </TabPanel>
                <TabPanel>
                    <h2>Books in my Wishlist</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ListedBooks;