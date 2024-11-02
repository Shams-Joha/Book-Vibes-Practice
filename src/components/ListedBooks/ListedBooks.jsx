import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getStoredReadList } from '../../../utility/addtoDB';
import Book from '../Book/Book';

const ListedBooks = () => {
    const allBooks = useLoaderData();
    const [readList, setReadList] = useState([]);
    const [sort, setSort] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown visibility

    useEffect(() => {
        const storedReadList = getStoredReadList();
        const storedReadListInt = storedReadList.map(id => parseInt(id));
        const readBookList = allBooks.filter(book => storedReadListInt.includes(book.bookId));
        setReadList(readBookList);
    }, [allBooks]);

    const handleSort = sortType => {
        setSort(sortType);
        setIsDropdownOpen(false); // Close dropdown after selecting sort option

        if (sortType === 'No of Pages') {
            const sortedReadList = [...readList].sort((a, b) => a.totalPages - b.totalPages);
            setReadList(sortedReadList);
        }
        if (sortType === 'Ratings') {
            const sortedReadList = [...readList].sort((a, b) => a.rating - b.rating);
            setReadList(sortedReadList);
        }
    };

    return (
        <div>
            <h2 className="text-3xl my-8">Listed Books</h2>
            <div className="dropdown">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on button click
                >
                    {sort ? `Sort BY ${sort}` : 'Sort By'}
                </div>
                {isDropdownOpen && ( // Render dropdown only if isDropdownOpen is true
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        <li onClick={() => handleSort('Ratings')}><a>Ratings</a></li>
                        <li onClick={() => handleSort('No of Pages')}><a>Number of Pages</a></li>
                    </ul>
                )}
            </div>
            <Tabs>
                <TabList>
                    <Tab>Read List</Tab>
                    <Tab>Wish List</Tab>
                </TabList>

                <TabPanel>
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
