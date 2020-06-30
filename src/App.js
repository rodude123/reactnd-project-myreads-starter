import React from 'react'
import * as bpi from './BooksAPI'
import './App.css'
import BookShelf from "./BookShelf";
import { Route, Link } from "react-router-dom";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component
{
	state = {books: []}
	
	componentDidMount()
	{
		this.getBooks();
	}
	
	componentDidUpdate(prevProps, prevState, snapshot)
	{
		this.getBooks();
	}
	
	getBooks = () =>
	{
		bpi.getAll().then(books =>
		{
			this.setState(() =>
				({
					books
				}))
		})
	};
	
	render()
	{
		const {books} = this.state;
		return (
			<div>
				<Route exact path="/" render={() =>
					(
						<div className="app">
							<div className="list-books">
								<div className="list-books-title">
									<h1>MyReads</h1>
								</div>
								<div className="list-books-content">
									<div>
										<BookShelf books={books.filter(book => book.shelf === "currentlyReading")}
										           bkTitle="Currently Reading" getBooks={this.getBooks}/>
										<BookShelf books={books.filter(book => book.shelf === "wantToRead")}
										           bkTitle="Want to Read"
										           getBooks={this.getBooks}/>
										<BookShelf books={books.filter(book => book.shelf === "read")} bkTitle="Read"
										           getBooks={this.getBooks}/>
									</div>
								</div>
								<div className="open-search">
									<Link to="/search">Add a book</Link>
								</div>
							</div>
						</div>
					)}/>
					<Route path="/search" render={() =>
					(
						<SearchBooks currBooks={this.state.books}/>
					)}/>
			</div>
		)
	}
}

export default BooksApp
