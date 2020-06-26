export default {
    application: {
        selectedTabIndex: 2,
        showSpinner: false,
        showToast: false,
        toastMessage: '',
        isLoggedIn: false,
        stores: [],
        books: [],
        userDetails: {
            username: '',
            firstName: '',
            lastName: '',
            photo: '',
            accountBalance: 0,
        }
    },
    login: {
        username: '',
        password: '',
        errorMessage: '',
        showLoading: false
    },
    register: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        photo: "",
        isUserCreated: false,
        showLoading: false,
        errorMessage: ''
    },
    stores: {
        list: [],
        errorMessage: "",
        searchParams: {
            name: '',
            pageNumber: 0
        },
        totalPages: 1,
    },
    storeBook: {
        isStoreBookModalOpen: false,
        selectedStore: '',
        selectedBook: '',
        quantityInStore: 0,
        price: 0,
        errors: [],
        addedBooks: []
    },
    storeState: {
        store: {
            name: "",
            address: "",
            phone: ""
        },
        errors: []
    },
    bookDetails: {
        pageNumber: 0,
        totalPages: 0,
        errorMessage: '',
        storesForBook: []
    },
    books: {
        list: [],
        errorMessage: "",
        isStoreModalOpen: false,
        bookDetailsObject: {},
        searchParams: {
            name: '',
            writer: '',
            publisher: '',
            publishingYear: 1,
            selectedStore: '',
            totalPages: 0,
            pageNumber: 0
        },
    },
    cart: {
        items: [],
        errors: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    transactions: {
        transactionList: [],
        selectedTransaction: {},
        transactionDetails: [],
        errors: []
    },
    addBookState: {
        book: {
            name: '',
            writer: '',
            publisher: '',
            publishingYear: '',
            photo: ''
        },
        errors: [],
        isBookModalOpen: false
    }
}