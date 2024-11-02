const getStoredReadList = () => {
    // Local Storage.
    const storedListStr = localStorage.getItem('read-list');
    if (storedListStr) {
        const storedList = JSON.parse(storedListStr);
        return storedList;

    }
    else {
        return [];
    }
}

const addToStoredReadList = (id) => {
    const storedList = getStoredReadList();

    if (storedList.includes(id)) {
        // Already Exists
        alert(`${id} already exists in the read list`);

    }
    else {
        storedList.push(id);
        const storedListStr = JSON.stringify(storedList);
        localStorage.setItem("read-list", storedListStr);
    }
}

export { addToStoredReadList, getStoredReadList };


// Homework Wish List. Same Process.